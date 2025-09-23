
import { QuizView } from './QuizView';

export default function QuizPage({ params }: { params: { course: string } }) {
  return <QuizView course={params.course} />;
}
