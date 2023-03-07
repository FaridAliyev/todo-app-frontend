import CloseIcon from '@mui/icons-material/Close';
import {
    Box,
    Button,
    Dialog as MUIDialog,
    DialogContent,
    DialogTitle,
    Divider,
    IconButton,
    Typography,
} from '@mui/material';
import { styled } from '@mui/styles';
import ConfirmIcon from 'assets/confirm.svg';
import DeleteIcon from 'assets/delete.svg';
import clsx from 'clsx';

export type ConfirmDialogType = 'error' | 'success';
export type ConfirmDialogDescription = string | undefined;

const Dialog = styled(MUIDialog)(() => ({
    '& .header': {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        paddingBottom: '16px',
        '& p': {
            fontSize: '24px',
        },
    },
    '& .icon': {
        width: '100px',
        margin: '24px 0 16px 0',
    },
    '& .closeIcon': {
        display: 'flex',
        alignSelf: 'flex-end',
    },
    '& .confirmButton': {
        backgroundColor: 'red',
        color: '#fff',
    },
    '& .headerWrapper': {
        // backgroundColor: theme.dark ? theme.palette.action.hover : '',
        padding: '16px',
    },
    '& .contentWrapper': {
        // backgroundColor: theme.dark ? '' : theme.palette.action.hover,
    },
    '& .content': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '24px',
    },
    '& .description': {
        marginBottom: '24px',
        textAlign: 'center',
    },
    '& .buttons': {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
    },
    '& .button': {
        margin: '8px',
        padding: '6.4px 16px',
        width: '35%',
    },
    '& .cancel-button': {
        color: 'darkgrey',
        borderColor: 'grey',
    },
}));

type ConfirmDialogProps = {
    open: boolean;
    onClose: (type: ConfirmDialogType, description: ConfirmDialogDescription) => void;
    onConfirm: any;
    confirmText?: string;
    description?: ConfirmDialogDescription;
    type?: ConfirmDialogType;
};

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
    open,
    confirmText,
    description,
    type = 'error',
    onClose,
    onConfirm,
}) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle className="headerWrapper">
                <Box className="header">
                    <IconButton size="small" onClick={() => onClose(type, description)} className="closeIcon">
                        <CloseIcon />
                    </IconButton>
                    {type === 'success' ? (
                        <img className="icon" src={ConfirmIcon} />
                    ) : (
                        <img className="icon" src={DeleteIcon} />
                    )}
                    <Typography color={type === 'success' ? 'primary' : 'error'}>
                        {confirmText || 'Are you sure?'}
                    </Typography>
                </Box>
            </DialogTitle>
            <Divider />
            <DialogContent className="contentWrapper">
                <Box className="content">
                    <Typography className="description">{description || 'This action cannot be undone'}</Typography>
                    <Box className="buttons">
                        <Button
                            onClick={() => onClose(type, description)}
                            variant="outlined"
                            className={clsx('button', 'cancel-button')}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={onConfirm}
                            variant="contained"
                            color={type === 'success' ? 'primary' : 'error'}
                            className="button"
                        >
                            Delete
                        </Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    );
};
