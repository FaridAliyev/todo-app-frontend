import React from 'react';
import { Box, Grid, CircularProgress, CircularProgressProps } from '@mui/material';
import { Typography } from '@mui/material';
import clsx from 'clsx';
import { styled } from '@mui/styles';

interface SpinnerProps extends CircularProgressProps {
    title?: string;
    style?: React.CSSProperties;
    spinnerStyle?: React.CSSProperties;
    color?: 'inherit' | 'secondary' | 'primary';
    button?: boolean;
    containerClassName?: string;
    spinnerClassName?: string;
}

const Root = styled(Box)(() => ({
    '& .fullPage': {
        width: '100%',
        height: `calc(100vh - 91px)`,
        alignItems: 'center',
        justifyContent: 'centent',
        flexDirection: 'column',
    },
    '& .button': {
        width: '16px',
        height: '16px',
        marginLeft: '8px',
    },
    '& .button-spinner': {
        width: `16px !important`,
        height: `16px !important`,
        margin: 'auto',
    },
}));

export const Spinner: React.FC<SpinnerProps> = ({
    title,
    button,
    disableShrink,
    style,
    spinnerStyle,
    containerClassName,
    spinnerClassName,
    color = 'primary',
    ...props
}) => {
    return (
        <Root>
            <Grid className={clsx('fullPage', button && 'button', containerClassName)} container style={{ ...style }}>
                <CircularProgress
                    className={clsx(button && 'button-spinner', spinnerClassName)}
                    style={{ ...spinnerStyle, margin: 'auto' }}
                    disableShrink={disableShrink}
                    color={button ? 'inherit' : color}
                    {...props}
                />

                {title && (
                    <Grid item style={{ marginTop: '5px' }}>
                        <Typography> {title}</Typography>
                    </Grid>
                )}
            </Grid>
        </Root>
    );
};
