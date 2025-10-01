import { QuizView } from './QuizView';

export default async function QuizPage({ 
  params 
}: { 
  params: Promise<{ course: string }> 
}) {
  const { course } = await params;
  return <QuizView course={course} />;
}
