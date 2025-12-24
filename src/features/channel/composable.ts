import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'
import Hls from 'hls.js'

export function useHLS(videoRef: Ref<HTMLVideoElement | null>, url: string) {
  let hls = ref<null | Hls>(null)

  onMounted(() => {
    const video = videoRef.value!
    const streamUrl = url

    if (Hls.isSupported()) {
      hls.value = new Hls()
      hls.value.loadSource(streamUrl)
      hls.value.attachMedia(video)
      hls.value.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play()
      })
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari)
      video.src = streamUrl
      video.addEventListener('loadedmetadata', () => {
        video.play().catch((e) => console.log(e))
      })
    } else {
      console.error('HLS not supported in this browser')
    }
  })

  onBeforeUnmount(() => {
    if (hls.value) hls.value.destroy()
  })

  return hls
}
