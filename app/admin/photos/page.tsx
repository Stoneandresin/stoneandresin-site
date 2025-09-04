export const dynamic = 'force-dynamic'; // avoid static pre-render

export default function AdminPhotosDisabled() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Photos (temporarily disabled)</h1>
      <p className="mt-2 text-sm text-gray-600">
        Uploads are paused while we remove Cloudinary. This page will return with a local/static workflow.
      </p>
    </div>
  );
}
