import { redirect } from "next/navigation"

export default function HomePage() {
  // Will redirect to login for now, later to dashboard if authenticated
  redirect("/login")
}
