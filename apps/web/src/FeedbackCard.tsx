import { Feedback } from "./App";

export type FeedbackCardProp = { feedback: Feedback; onAdvance: () => void};

export default function FeedbackCard({feedback, onAdvance}: FeedbackCardProp) {
    return (
    <article>
        <div>
            <span className={`status ${feedback.status}`}>{feedback.status}</span>
            <h3>{feedback.title}</h3>
            <p>{feedback.description}</p>
        </div><button className="secondary" onClick={onAdvance}>Move forward →</button>
    </article>
    )
}