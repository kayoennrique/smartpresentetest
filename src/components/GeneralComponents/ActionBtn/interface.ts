export interface SurveyActionsProps {
    onBack?: () => void;
    onNext?: () => void;

    showBack?: boolean;
    showNext?: boolean;

    backLabel?: string;
    nextLabel?: string;

    backDisabled?: boolean;
    nextDisabled?: boolean;

    backIcon?: string;
    nextIcon?: string;

    containerClassName?: string;
    backButtonClassName?: string;
    nextButtonClassName?: string;

    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    children?: React.ReactNode;

    variant?: "primary" | "secondary";
}
