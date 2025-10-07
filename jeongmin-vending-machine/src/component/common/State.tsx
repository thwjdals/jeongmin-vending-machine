import { type ReactNode } from "react";

interface StateProps {
    title: string;
    content: ReactNode;
}

export default function State({ title, content }: StateProps) {
    return <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>{title} : {content}</div>;
}