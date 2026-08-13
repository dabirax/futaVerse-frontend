import { useRef, useState } from 'react'
import { ExternalLink, FileText, Trash2, UploadCloud } from 'lucide-react'
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
import ConfirmActionDialog from '@/components/user/ConfirmActionDialog'
import {
  useDeleteResume,
  useResumes,
  useUploadResume,
} from '@/hooks/useResumes'
import { uploadProfileImage } from '@/services/uploads'

const StudentSettings = () => {
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

  const { data: resumesData, isLoading: resumesLoading } = useResumes()
  const uploadResume = useUploadResume()
  const deleteResume = useDeleteResume()
  const [selectedResume, setSelectedResume] = useState<File | null>(null)
  const [resumeStatus, setResumeStatus] = useState<{
    type: 'error' | 'success'
    message: string
  } | null>(null)
  const resumeInputRef = useRef<HTMLInputElement>(null)

  const resumes = resumesData?.results ?? []

  const handleResumeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedResume(e.target.files?.[0] ?? null)
    setResumeStatus(null)
  }

  const handleResumeUpload = () => {
    if (!selectedResume) return
    setResumeStatus(null)
    uploadResume.mutate(selectedResume, {
      onSuccess: () => {
        setSelectedResume(null)
        if (resumeInputRef.current) resumeInputRef.current.value = ''
        setResumeStatus({ type: 'success', message: 'Resume uploaded.' })
      },
      onError: (err: any) => {
        setResumeStatus({
          type: 'error',
          message: err?.message ?? 'Upload failed. Please try again.',
        })
      },
    })
  }

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
              <AvatarFallback className="text-lg">ST</AvatarFallback>
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
          <CardTitle>Resumes</CardTitle>
          <CardDescription>
            Upload resumes to reuse when applying for internships.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {resumesLoading ? (
            <p className="text-sm text-muted-foreground">Loading resumes...</p>
          ) : resumes.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No resumes uploaded yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {resumes.map((resume) => (
                <li
                  key={resume.sqid}
                  className="flex items-center justify-between gap-3 rounded-lg border p-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {resume.filename}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Uploaded{' '}
                        {new Date(resume.uploaded_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button asChild variant="ghost" size="icon">
                      <a
                        href={resume.resume}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View ${resume.filename}`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <ConfirmActionDialog
                      trigger={
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Delete ${resume.filename}`}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      }
                      title="Delete this resume?"
                      description={`"${resume.filename}" will be permanently removed.`}
                      confirmLabel="Delete"
                      destructive
                      successTitle="Resume deleted"
                      successDescription="Your resume has been removed."
                      onConfirm={() => deleteResume.mutateAsync(resume.sqid)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="space-y-2">
            <Input
              ref={resumeInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="max-w-sm"
              onChange={handleResumeFileChange}
            />
            {selectedResume && (
              <p className="text-sm text-muted-foreground">
                {selectedResume.name}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleResumeUpload}
              disabled={!selectedResume || uploadResume.isPending}
              className="gap-2"
            >
              {uploadResume.isPending ? (
                <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
              ) : (
                <UploadCloud className="h-4 w-4" />
              )}
              {uploadResume.isPending ? 'Uploading...' : 'Upload'}
            </Button>

            {selectedResume && (
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedResume(null)
                  if (resumeInputRef.current) resumeInputRef.current.value = ''
                }}
              >
                Cancel
              </Button>
            )}
          </div>

          {resumeStatus && (
            <p
              className={`text-sm font-medium ${
                resumeStatus.type === 'success'
                  ? 'text-green-600'
                  : 'text-red-500'
              }`}
            >
              {resumeStatus.message}
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
          <p className="text-sm text-muted-foreground">
            Password change and notification preferences will be available here.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

export default StudentSettings
