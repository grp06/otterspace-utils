import Link from 'next/link'
import { Dialog } from '@headlessui/react'
import { BadgeCard } from '@/components/cards/BadgeCard'
import type { BadgeCardProps } from '@/components/cards/BadgeCard'
import { OTTERSPACE_CONFIG } from '@/lib/otterspace/config'

interface BurnDialogProps extends BadgeCardProps {
  isOpen: boolean
  isLoading: boolean
  isSuccess: boolean
  isWaitingSign: boolean
  chainId: 5 | 10
  txHash: string
  onClose: () => void
  onBurn: () => void
}

export const BurnDialog = ({
  isOpen,
  isLoading,
  isSuccess,
  isWaitingSign,
  chainId,
  txHash,
  onClose,
  onBurn,
  image,
  title
}: BurnDialogProps): JSX.Element => {
  return (
    <Dialog className="min-h-screen" open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 flex min-h-screen items-center justify-center border bg-gray-600/50">
        <Dialog.Panel className="flex w-full max-w-md flex-col items-center justify-center rounded-lg bg-white p-8">
          {isLoading ? (
            <>
              <Dialog.Title className="text-center text-xl font-semibold">
                Burning badge...
              </Dialog.Title>
              <div className="mt-4" role="status">
                <svg
                  aria-hidden="true"
                  className="mr-2 h-8 w-8 animate-spin fill-blue-700 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </>
          ) : isSuccess ? (
            <>
              <Dialog.Title className="text-center text-xl font-semibold">
                Badge successfully burned 🔥
              </Dialog.Title>
              <p className="mt-3">
                Check on explorer:{' '}
                <Link
                  href={`${OTTERSPACE_CONFIG[chainId].blockExplorer}/tx/${txHash}`}
                  target="_blank"
                  className="font-medium underline"
                >
                  Transaction Hash
                </Link>
              </p>
            </>
          ) : (
            <>
              <Dialog.Title className="text-center text-xl font-semibold">
                Are you Sure you want to burn this badge?
              </Dialog.Title>
              <BadgeCard image={image} title={title} />
              <div className="mt-6 flex gap-x-4">
                <button
                  onClick={onClose}
                  className="w-28 rounded-lg bg-gray-600/20 px-3 py-2 text-lg text-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={onBurn}
                  disabled={isWaitingSign}
                  className="w-28 rounded-lg bg-red-600 px-3 py-2 text-lg font-semibold text-white disabled:bg-red-600/70"
                >
                  {isWaitingSign ? 'Waiting' : 'Burn'}
                </button>
              </div>
            </>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
