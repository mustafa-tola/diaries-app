import React, { ReactElement } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import {logout}  from "../../features/auth/authSlice";
import {useDispatch} from "react-redux";

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
    const dispatch = useDispatch();

    return (
        <div>
            <AppBar position="static" classes={{colorPrimary: classes.colorPrimary}}>
              <Link to="/" >
                <h3>Diaries</h3>
              </Link>
                <Button color="inherit" onClick={() => dispatch(logout())}>Logout</Button>
            </AppBar>
        </div>
    )
}

export default Header
