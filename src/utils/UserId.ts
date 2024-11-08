export function parseJwt(): string | null {
  //const token = localStorage.getItem("accessToken");
  const token = typeof window !== "undefined" ? window.localStorage.getItem("accessToken") : ''
  if (!token) return null;

  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  const parsedPayload = JSON.parse(jsonPayload);
  return parsedPayload.sub || null;
}
