import CloseIcon from '@mui/icons-material/Close';
import { ReactComponent as InfoIcon } from 'assets/icons/question.svg';
import { ReactComponent as WarningIcon } from 'assets/icons/exclamation.svg';
import { ReactComponent as ErrorIcon } from 'assets/icons/union.svg';
import { ReactComponent as CheckIcon } from 'assets/icons/vector.svg';
import {
    Box,
    darken,
    IconButton,
    Snackbar as MUISnackbar,
    SnackbarCloseReason,
    SnackbarContent,
    Typography,
} from '@mui/material';
import { amber, green } from '@mui/material/colors';
import { styled } from '@mui/styles';
import clsx from 'clsx';

const Root = styled(Box)(() => ({
    '& .snackbar-content': {
        width: '100%',
    },
    '& .message': {
        display: 'flex',
        width: '100%',
        maxWidth: '350px',
    },
    '& .close': {
        padding: '4px',
    },
    '& .general': {
        borderRadius: '24px',
    },
    '& .success': {
        backgroundColor: green[600],
        fill: darken(green[600], 0.1),
    },
    '& .error': {
        backgroundColor: '#FF0000',
        fill: darken('#FF0000', 0.1),
    },
    '& .info': {
        backgroundColor: '#0000FF',
        fill: darken('#0000FF', 0.1),
    },
    '& .warning': {
        backgroundColor: amber[700],
        fill: darken(amber[700], 0.1),
    },
    '& .main-container': {
        display: 'flex',
        alignItems: 'center',
        transform: `translateY(-40px)`,
    },
    '& .icon': {
        fontSize: 24,
        opacity: 0.9,
    },
    '& .main-wrapper': {
        position: 'relative',
    },
    '& .icon-wrapper': {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -60%)',
    },
}));

export type SnackbarType = 'success' | 'error' | 'info' | 'warning';

type SnackbarProps = {
    open: boolean;
    autoHideDuration?: number | null;
    onClose: (event?: React.SyntheticEvent<any, Event>, reason?: SnackbarCloseReason) => void;
    type: SnackbarType;
    message: string;
};
export const Snackbar: React.FC<SnackbarProps> = ({ open, autoHideDuration, onClose, type, message }) => {
    const variantIcon = (type: string): React.ReactNode => {
        const className = clsx('icon');
        switch (type) {
            case 'success':
                return <CheckIcon className={className} />;
            case 'warning':
                return <WarningIcon className={className} />;
            case 'error':
                return <ErrorIcon className={className} />;
            case 'info':
                return <InfoIcon className={className} />;
            default:
                return <CheckIcon className={className} />;
        }
    };

    const generateClassname = (type: string): string | undefined => {
        switch (type) {
            case 'success':
                return 'success';
            case 'warning':
                return 'warning';
            case 'error':
                return 'error';
            case 'info':
                return 'info';
        }
    };

    const generateTitle = (type: string): string | undefined => {
        switch (type) {
            case 'success':
                return 'Success';
            case 'warning':
                return 'Warning';
            case 'error':
                return 'Error';
            case 'info':
                return 'Info';
        }
    };

    return (
        <Root>
            <MUISnackbar
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={open}
                autoHideDuration={autoHideDuration}
                onClose={onClose}
            >
                <SnackbarContent
                    classes={{ message: 'snackbar-content' }}
                    className={generateClassname(type) + ' general'}
                    aria-describedby="client-snackbar"
                    message={
                        <Box className="message" id="client-snackbar">
                            <Box className="main-container">
                                <Box className="main-wrapper">
                                    <svg
                                        width="50"
                                        height="50"
                                        viewBox="0 0 78 78"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            className={generateClassname(type)}
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M38.9997 68.64C57.9541 68.64 73.3197 53.2744 73.3197 34.32C73.3197 15.3656 57.9541 0 38.9997 0C20.0453 0 4.67969 15.3656 4.67969 34.32C4.67969 44.9926 9.55126 54.5274 17.192 60.822C17.2042 60.832 17.1934 60.8515 17.1784 60.8464V60.8464C17.1693 60.8433 17.1597 60.8501 17.1597 60.8598V71.5042C17.1597 74.4834 20.2999 76.4171 22.9603 75.076L34.9717 69.0212C35.6351 68.6867 36.3783 68.5494 37.1202 68.5894C37.7425 68.623 38.3691 68.64 38.9997 68.64Z"
                                        ></path>
                                    </svg>
                                    <Box className="icon-wrapper">{variantIcon(type)}</Box>
                                </Box>
                            </Box>

                            <Box flex={1} textAlign="center">
                                <Typography sx={{ mb: 0.5 }}>{generateTitle(type)}</Typography>
                                <Typography fontSize={14}>{message}</Typography>
                            </Box>
                            <Box display="flex" justifyContent="flex-end" alignItems="flex-start" minWidth={50}>
                                <IconButton
                                    key="close"
                                    aria-label="close"
                                    color="inherit"
                                    className="close"
                                    onClick={onClose}
                                >
                                    <CloseIcon className="icon" />
                                </IconButton>
                            </Box>
                        </Box>
                    }
                />
            </MUISnackbar>
        </Root>
    );
};
