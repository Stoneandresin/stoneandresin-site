// Type declarations for Tidio Chat API
interface TidioChatApi {
  /**
   * Show the chat widget
   */
  show: () => void;
  /**
   * Hide the chat widget
   */
  hide: () => void;
  /**
   * Open the chat widget
   */
  open: () => void;
  /**
   * Close the chat widget
   */
  close: () => void;
  /**
   * Identify a visitor
   */
  (method: "identify", data: { name?: string; email?: string }): void;
  /**
   * Execute a Tidio API method
   */
  (method: string, ...args: any[]): void;
}

interface Window {
  tidioChatApi?: TidioChatApi;
}
