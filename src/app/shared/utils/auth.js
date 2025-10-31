import { isEmpty } from "lodash";

export function auth() {
  const token = localStorage.getItem("token");
  const iframeToken = localStorage.getItem("iframeToken");

  // Determine which token to use (iframeToken takes priority if present)
  const activeToken = !isEmpty(iframeToken) ? iframeToken : token;

  // Base headers
  const headers = {
    "accept-language": "en",
  };

  // Add Authorization only if we have a token
  if (!isEmpty(activeToken)) {
    headers.Authorization = `Bearer ${activeToken}`;
  }

  return { headers };
}
