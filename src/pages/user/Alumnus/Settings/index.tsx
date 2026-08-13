import { useRef, useState } from 'react'
import { ImagePlus, UploadCloud } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { uploadProfileImage } from '@/services/uploads'

const AlumnusSettings = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>(
    sessionStorage.getItem('profile_img') ?? '',
  )
  const [isUploading, setIsUploading] = useState(false)
  const [status, setStatus] = useState<{
    type: 'error' | 'success'
    message: string
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setSelectedFile(file)
    setStatus(null)
    if (file) {
      setPreviewUrl(URL.createObjectURL(file))
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    setIsUploading(true)
    setStatus(null)
    try {
      const uploaded = await uploadProfileImage(selectedFile)
      sessionStorage.setItem('profile_img', uploaded.url)
      setPreviewUrl(uploaded.url)
      setSelectedFile(null)
      setStatus({ type: 'success', message: 'Profile picture updated.' })
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err?.message ?? 'Upload failed. Please try again.',
      })
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile and preferences
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>
            Upload a photo that will appear across the Futaverse network.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              {previewUrl ? (
                <AvatarImage src={previewUrl} alt="Profile" />
              ) : null}
              <AvatarFallback className="text-lg">AL</AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <Input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="max-w-sm"
                onChange={handleFileChange}
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground">
                  {selectedFile.name}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleUpload}
              disabled={!selectedFile || isUploading}
              className="gap-2"
            >
              {isUploading ? (
                <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
              ) : (
                <UploadCloud className="h-4 w-4" />
              )}
              {isUploading ? 'Uploading...' : 'Upload'}
            </Button>

            {selectedFile && (
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedFile(null)
                  if (fileInputRef.current) fileInputRef.current.value = ''
                }}
              >
                Cancel
              </Button>
            )}
          </div>

          {status && (
            <p
              className={`text-sm font-medium ${
                status.type === 'success' ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {status.message}
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>More settings are coming soon.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <ImagePlus className="h-4 w-4" />
            Password change and notification preferences will be available here.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default AlumnusSettings
