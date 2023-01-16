import { ConnectButton } from '@rainbow-me/rainbowkit'

export const Navbar = () => {
  return (
    <nav className="flex h-24 items-center justify-between bg-dark-yellow px-12">
      <h2 className="text-2xl font-bold ">Otterspace Utils</h2>
      <ConnectButton />
    </nav>
  )
}
