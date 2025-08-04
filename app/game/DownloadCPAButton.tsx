"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, Lock, X, AlertCircle } from "lucide-react"

interface DownloadCPAButtonProps {
  gameName?: string
}

declare global {
  interface Window {
    adblockRedirect?: string;
    MyLead?: any;
  }
}

export default function DownloadCPAButton({ gameName = "Game" }: DownloadCPAButtonProps) {
  const [showCPAModal, setShowCPAModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [debugInfo, setDebugInfo] = useState<string[]>([])
  const [showDebug, setShowDebug] = useState(false)

  const addDebugInfo = (message: string) => {
    console.log(`[MyLead Debug]: ${message}`)
    setDebugInfo(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  // Cleanup function
  const cleanupMyLeadElements = () => {
    try {
      // Remove scripts
      const elementsToRemove = [
        "mylead-locker-script",
        "mylead-inline-script", 
        "mylead-noscript"
      ]
      
      elementsToRemove.forEach(id => {
        const element = document.getElementById(id)
        if (element) {
          element.remove()
          addDebugInfo(`Removed element: ${id}`)
        }
      })

      // Remove any dynamically created MyLead elements
      const myLeadElements = document.querySelectorAll('[id*="mylead"], [class*="mylead"], [id*="MyLead"], [class*="MyLead"]')
      myLeadElements.forEach(el => {
        if (el.id !== "mylead-container") {
          el.remove()
          addDebugInfo(`Removed dynamic element: ${el.tagName}#${el.id}`)
        }
      })

      // Clear container
      const container = document.getElementById("mylead-container")
      if (container) {
        container.innerHTML = ""
        addDebugInfo("Cleared mylead-container")
      }
    } catch (error) {
      addDebugInfo(`Cleanup error: ${error}`)
    }
  }

  const checkAdBlocker = () => {
    // Simple ad blocker detection
    const testAd = document.createElement('div')
    testAd.innerHTML = '&nbsp;'
    testAd.className = 'adsbox'
    testAd.style.position = 'absolute'
    testAd.style.left = '-9999px'
    document.body.appendChild(testAd)
    
    setTimeout(() => {
      if (testAd.offsetHeight === 0) {
        addDebugInfo("Ad blocker detected!")
      } else {
        addDebugInfo("No ad blocker detected")
      }
      testAd.remove()
    }, 100)
  }

  useEffect(() => {
    if (!showCPAModal) {
      cleanupMyLeadElements()
      setDebugInfo([])
      return
    }

    setIsLoading(true)
    addDebugInfo("Modal opened, starting setup...")
    checkAdBlocker()

    const timeout = setTimeout(() => {
      try {
        // Clean everything first
        cleanupMyLeadElements()

        // Set up global variables
        if (typeof window !== 'undefined') {
          window.adblockRedirect = "https://bestlocker.eu/adblock"
          addDebugInfo("Set adblockRedirect variable")
        }

        // Check if container exists
        const container = document.getElementById("mylead-container")
        if (!container) {
          addDebugInfo("ERROR: mylead-container not found!")
          setIsLoading(false)
          return
        }

        addDebugInfo("Container found, creating noscript...")

        // Add noscript
        const noscriptTag = document.createElement("noscript")
        noscriptTag.id = "mylead-noscript"
        noscriptTag.innerHTML = '<meta http-equiv="refresh" content="0;url=https://bestlocker.eu/noscript"/>'
        document.head.appendChild(noscriptTag)
        addDebugInfo("Added noscript tag")

        // Test script URL accessibility
        fetch("https://bestlocker.eu/iframeLoader/88e5a58e-7131-11f0-b64c-c2a106037d45", { 
          method: 'HEAD',
          mode: 'no-cors'
        }).then(() => {
          addDebugInfo("Script URL is accessible")
        }).catch(() => {
          addDebugInfo("Script URL might be blocked or inaccessible")
        })

        addDebugInfo("Creating script element...")

        // Try multiple approaches to load MyLead
        
        // Method 1: Direct script injection (current method)
        const lockerScript = document.createElement("script")
        lockerScript.id = "mylead-locker-script"
        lockerScript.type = "text/javascript"
        lockerScript.src = "https://bestlocker.eu/iframeLoader/88e5a58e-7131-11f0-b64c-c2a106037d45"
        lockerScript.async = true
        
        lockerScript.onload = () => {
          addDebugInfo("Script loaded successfully!")
          
          // Try to manually trigger MyLead if it exists
          setTimeout(() => {
            // Check various possible MyLead objects
            const possibleObjects = ['MyLead', 'mylead', 'myLead', 'BestLocker', 'ContentLocker']
            let foundObject = null
            
            possibleObjects.forEach(objName => {
              if (window[objName]) {
                foundObject = objName
                addDebugInfo(`Found object: ${objName}`)
              }
            })
            
            if (!foundObject) {
              addDebugInfo("No MyLead-related objects found in window")
              
              // Try Method 2: Direct iframe injection
              addDebugInfo("Attempting direct iframe method...")
              const container = document.getElementById("mylead-container")
              if (container) {
                // Try creating iframe directly with the locker URL
                const iframe = document.createElement('iframe')
                iframe.src = "https://bestlocker.eu/iframeLoader/88e5a58e-7131-11f0-b64c-c2a106037d45"
                iframe.style.width = "100%"
                iframe.style.height = "400px"
                iframe.style.border = "none"
                iframe.onload = () => addDebugInfo("Direct iframe loaded")
                iframe.onerror = () => addDebugInfo("Direct iframe failed to load")
                container.appendChild(iframe)
                addDebugInfo("Direct iframe method attempted")
              }
            }
            
            // Method 3: Try alternative script loading
            if (!foundObject) {
              addDebugInfo("Trying alternative script approach...")
              const altScript = document.createElement("script")
              altScript.innerHTML = `
                (function() {
                  var container = document.getElementById('mylead-container');
                  if (container) {
                    container.innerHTML = '<div style="text-align: center; padding: 20px; color: #fff;">Loading alternative method...</div>';
                    
                    // Try to load via fetch and eval (risky but for debugging)
                    fetch('https://bestlocker.eu/iframeLoader/88e5a58e-7131-11f0-b64c-c2a106037d45')
                      .then(response => response.text())
                      .then(scriptContent => {
                        console.log('Fetched script content length:', scriptContent.length);
                        // Don't eval in production, just log for debugging
                      })
                      .catch(err => console.log('Fetch method failed:', err));
                  }
                })();
              `
              document.body.appendChild(altScript)
            }
            
            // Check for any iframes or content in container
            const container = document.getElementById("mylead-container")
            if (container) {
              const iframes = container.querySelectorAll('iframe')
              const hasContent = container.children.length > 0
              addDebugInfo(`Container has ${container.children.length} children, ${iframes.length} iframes`)
              
              if (iframes.length === 0 && !hasContent) {
                addDebugInfo("No content loaded - Possible solutions:")
                addDebugInfo("1. Check MyLead dashboard - is locker active?")
                addDebugInfo("2. Verify locker ID in MyLead account")
                addDebugInfo("3. Check if your domain is whitelisted")
                addDebugInfo("4. Test the locker URL directly in browser")
                addDebugInfo("5. Contact MyLead support with locker ID")
                
                // Add a test button to open locker URL directly
                const testButton = document.createElement('button')
                testButton.innerHTML = 'Test Locker URL Directly'
                testButton.style.cssText = 'background: #7c3aed; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; margin: 10px;'
                testButton.onclick = () => {
                  window.open('https://bestlocker.eu/iframeLoader/88e5a58e-7131-11f0-b64c-c2a106037d45', '_blank')
                }
                container.appendChild(testButton)
              }
            }
            
            setIsLoading(false)
          }, 3000) // Increased wait time
        }
        
        lockerScript.onerror = (error) => {
          addDebugInfo(`Script failed to load: ${error}`)
          setIsLoading(false)
        }

        document.head.appendChild(lockerScript)
        addDebugInfo("Script added to document head")

        // Backup timeout
        setTimeout(() => {
          if (isLoading) {
            addDebugInfo("Timeout reached - stopping loading state")
            setIsLoading(false)
          }
        }, 15000)

      } catch (err) {
        addDebugInfo(`Setup error: ${err}`)
        setIsLoading(false)
      }
    }, 1000) // Increased delay

    return () => {
      clearTimeout(timeout)
    }
  }, [showCPAModal])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupMyLeadElements()
    }
  }, [])

  return (
    <>
      {showCPAModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-2xl w-full relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowCPAModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <Lock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Unlock Download</h3>
              <p className="text-gray-300 text-sm">
                Complete a quick offer to unlock{" "}
                <span className="text-purple-400 font-semibold">{gameName}</span>
              </p>
            </div>

            {isLoading && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-400 mx-auto"></div>
                <p className="text-gray-400 mt-2">Loading offer...</p>
              </div>
            )}

            <div id="mylead-container" className="min-h-[400px] bg-gray-800 rounded-lg p-4">
              {!isLoading && (
                <div className="text-center text-gray-400 py-8">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                  <p className="text-sm mb-2">No offer loaded yet</p>
                  <p className="text-xs text-gray-500 mb-4">
                    If offers don't appear, try disabling ad blocker or check debug info below
                  </p>
                  <button
                    onClick={() => setShowDebug(!showDebug)}
                    className="text-xs text-purple-400 hover:text-purple-300 underline"
                  >
                    {showDebug ? 'Hide' : 'Show'} Debug Info
                  </button>
                </div>
              )}
            </div>

            {showDebug && (
              <div className="mt-4 bg-gray-800 rounded-lg p-4 max-h-40 overflow-y-auto">
                <h4 className="text-sm font-semibold text-white mb-2">Debug Information:</h4>
                <div className="text-xs text-gray-300 space-y-1">
                  {debugInfo.length === 0 ? (
                    <p>No debug information yet...</p>
                  ) : (
                    debugInfo.map((info, index) => (
                      <div key={index} className="font-mono">{info}</div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-6">
        <Button
          onClick={() => setShowCPAModal(true)}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          <Download className="w-5 h-5 mr-2" />
          Download {gameName}
        </Button>
        <p className="text-xs text-gray-400 text-center mt-2">
          Free download • Complete quick offer to unlock
        </p>
      </div>
    </>
  )
}