export function ErrorHandler(e: any) {
  if (e.code === "CALL_EXCEPTION" || e.code === "INSUFFICIENT_FUNDS") {
    return e.reason
  } else {
    return null;
  }
}
