// Maps image filenames to their webpack require() calls.
// This allows DataContext to store filenames as strings in JSON,
// while still resolving the actual imported images for rendering.

const imageMap = {
  "pos-updated.jpg":         require("./image/pos-updated.jpg"),
  "pos.jpg":                 require("./image/pos.jpg"),
  "pos-update.jpg":          require("./image/pos-update.jpg"),
  "AI_Chat_sdk.jpg":         require("./image/AI_Chat_sdk.jpg"),
  "AI_Chat_sdk1.jpg":        require("./image/AI_Chat_sdk1.jpg"),
  "Multivendor_Home.jpg":    require("./image/Multivendor_Home.jpg"),
  "Multivendor_Home2.jpg":   require("./image/Multivendor_Home2.jpg"),
  "artifisms.png":           require("./image/artifisms.png"),
  "Martvill.jpg":            require("./image/Martvill.jpg"),
  "MartvillLandingPage.png": require("./image/MartvillLandingPage.png"),
  "Home _ AmaderSer.png":    require("./image/Home _ AmaderSer.png"),
  "Crypto_userdashboard.jpg":require("./image/Crypto_userdashboard.jpg"),
  "Crypto_userdashboard1.jpg":require("./image/Crypto_userdashboard1.jpg"),
  "paymoney-userdashboard.jpg": require("./image/paymoney-userdashboard.jpg"),
  "Home.jpg":                require("./image/Home.jpg"),
  "paymoney.jpg":            require("./image/paymoney.jpg"),
  "CryptoLandingPage.png":   require("./image/CryptoLandingPage.png"),
  "Vrent.jpg":               require("./image/Vrent.jpg"),
  "BuyingHouse.png":         require("./image/BuyingHouse.png"),
  "roverCRM.jpg":            require("./image/roverCRM.jpg"),
  "Hotel-2.jpg":             require("./image/Hotel-2.jpg"),
  "Brikkhorongon.jpg":       require("./image/Brikkhorongon.jpg"),
  "mobileapp.png":           require("./image/mobileapp.png"),
  "martvill-app.jpg":        require("./image/martvill-app.jpg"),
  "artifism-app.png":        require("./image/artifism-app.png"),
  "wallet-pay-banner.png":   require("./image/wallet-pay-banner.png"),
  "Covid.jpg":               require("./image/Covid.jpg"),
  "Hooks.jpg":               require("./image/Hooks.jpg"),
  "Pharmacy.jpg":            require("./image/Pharmacy.jpg"),
  "tic-tac-toe.jpg":         require("./image/tic-tac-toe.jpg"),
  "todo.jpg":                require("./image/todo.jpg"),
  "Plan.jpg":                require("./image/Plan.jpg"),
  "medical-website.jpg":     require("./image/medical-website.jpg"),
  "Travelsupport.jpg":       require("./image/Travelsupport.jpg"),
  "Edu.jpg":                 require("./image/Edu.jpg"),
  "comming_soon.jpg":        require("./image/comming_soon.jpg"),
  "icpc.jpg":                require("./image/icpc.jpg"),
}

/**
 * Resolves an image value:
 * - If it starts with http/https/data: → treat as URL, return as-is
 * - If it's a filename → look up in imageMap
 * - Otherwise return null
 */
export function resolveImage(value) {
  if (!value) return null
  if (typeof value === "object") return value // already a required module
  if (value.startsWith("http") || value.startsWith("data:") || value.startsWith("/")) return value
  return imageMap[value] || null
}

export default imageMap
