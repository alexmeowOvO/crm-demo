export type RemoteConfig = { entry: string; version: string }

export let remotesManifest: Record<string, RemoteConfig> = {}

export function setRemotesManifest(m: Record<string, RemoteConfig>) {
  remotesManifest = m
}
