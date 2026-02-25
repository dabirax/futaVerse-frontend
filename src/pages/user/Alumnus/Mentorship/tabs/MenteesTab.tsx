import MenteeCard from '../../../../../components/user/mentorships/MenteeCard'

export default function MenteesTab() {
  const mentees: any[] = []

  return (
    <div className="space-y-3">
      {mentees.length > 0 ? (
        mentees.map((mentee, index) => (
          <MenteeCard
            key={index}
            studentName={mentee.studentName}
            mentorshipTitle={mentee.mentorshipTitle}
            status={mentee.status}
            startDate={mentee.startDate}
            onMessage={() => console.log('Message mentee')}
            onViewProgress={() => console.log('View progress')}
          />
        ))
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          Mentees will appear here once mentorships are accepted.
        </div>
      )}
    </div>
  )
}
