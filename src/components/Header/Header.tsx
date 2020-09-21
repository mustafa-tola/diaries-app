import React, { ReactElement } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    colorPrimary:{
        backgroundColor: '#fff',
        height: '60px',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 30px',
        flexDirection: 'row',
        color: '#000'
    }
  }),
);

interface Props {
    
}

function Header({}: Props): ReactElement {
    const classes = useStyles();

    return (
        <div>
            <AppBar position="static" classes={{colorPrimary: classes.colorPrimary}}>
                <h3>Diaries</h3>
                <Button color="inherit">Logout</Button>
            </AppBar>
        </div>
    )
}

export default Header
