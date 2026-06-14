type Props = {
  url: string;
  caption?: string;
};

function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

export default function Video({ url, caption }: Props) {
  const id = getYouTubeId(url);

  if (!id) return null;

  return (
    <figure className="my-9">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[var(--hairline)]">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={caption || "Video"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-[var(--text-muted)] font-mono">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
