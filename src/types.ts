export type Channel = {
  _id: string
  title: string
  category: string
  viewers: number
  channelName: string
  username: string
  tags: string[]
  description: string
  avatar: string
  duration: string
  is_live: string
  is_multistream: string
}

type LiveStreamCategory = {
  name: string
  link: string
}

export type LiveStream = {
  _id: string
  title: string
  category: LiveStreamCategory
  tags: string[]
  description: string
  username: string
  avatar: string
  is_live: string
  is_multistream: string
  thumbnail: string
  started_at: number
  is_following: boolean
  is_subscriber: boolean
  viewers: number
}

export type Category = {
  _id: string
  id: string
  name: string
  thumbnail: string
  viewers: number
  tags: string[]
  link: string
  is_safe: boolean
}
