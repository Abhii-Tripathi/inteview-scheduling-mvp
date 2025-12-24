"use client"

import Link from "next/link"
import type { EventType } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Copy, ExternalLink } from "lucide-react"
import { useState } from "react"

interface EventTypesListProps {
  eventTypes: EventType[]
  userId: string
}

export function EventTypesList({ eventTypes, userId }: EventTypesListProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const copyLink = (slug: string, id: string) => {
    const url = `${window.location.origin}/book/${slug}`
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (!eventTypes.length) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">No event types yet. Create your first one!</p>
        <Link href="/dashboard/event-types/new">
          <Button>Create Event Type</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {eventTypes.map((eventType) => (
        <div
          key={eventType.id}
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
        >
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold">{eventType.title}</h3>
              <Badge variant={eventType.is_active ? "default" : "secondary"}>
                {eventType.is_active ? "Active" : "Inactive"}
              </Badge>
            </div>
            {eventType.description && <p className="text-sm text-muted-foreground mb-2">{eventType.description}</p>}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {eventType.duration} minutes
              </div>
              <code className="text-xs bg-muted px-2 py-1 rounded">/book/{eventType.slug}</code>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => copyLink(eventType.slug, eventType.id)}>
              {copiedId === eventType.id ? (
                "Copied!"
              ) : (
                <>
                  <Copy className="h-3 w-3 mr-1" />
                  Copy Link
                </>
              )}
            </Button>
            <Link href={`/book/${eventType.slug}`} target="_blank">
              <Button variant="outline" size="sm">
                <ExternalLink className="h-3 w-3" />
              </Button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
