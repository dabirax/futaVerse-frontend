import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteResume, listResumes, uploadResume } from '@/services/resumes'

export const useResumes = () => {
  return useQuery({
    queryKey: ['resumes'],
    queryFn: listResumes,
  })
}

export const useUploadResume = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (file: File) => uploadResume(file),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['resumes'] })
    },
  })
}

export const useDeleteResume = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (sqid: string) => deleteResume(sqid),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['resumes'] })
    },
  })
}
