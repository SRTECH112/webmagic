"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function FloatingMessenger() {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring" }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        size="icon"
        className="h-14 w-14 rounded-full bg-[#0084FF] text-white hover:bg-[#0084FF]/90 shadow-lg hover:shadow-xl transition-shadow"
        asChild
      >
        <a
          href="https://m.me/webmagicph"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on Messenger"
        >
          <MessageCircle className="h-8 w-8" />
        </a>
      </Button>
    </motion.div>
  )
}
