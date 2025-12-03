.PHONY: prod dev


dev:
	bun run dev


prod:
	bun run build \
	bun run preview
