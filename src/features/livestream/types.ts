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
