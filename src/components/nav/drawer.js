import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import ListIcon from '@material-ui/icons/List';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox';
import MenuIcon from '@material-ui/icons/Menu';
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function DrawerNav(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false)

 const handleChangeDrawOpen = () =>{
     open?setOpen(false):setOpen(true)
 }
const listEvent = (item)=>{
    props.item(item)
}
  const list = () => (
    <div
      className={clsx(classes.list)}
      role="presentation"
    >
      <List>
        <ListItem>
            <ListItemIcon>
                <AirportShuttleIcon/>
            </ListItemIcon>
            <ListItemText>
                Route
            </ListItemText>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={()=>listEvent('zipcode')}> 
            <ListItemIcon>
            <MarkunreadMailboxIcon/>
            </ListItemIcon>
            <ListItemText>
            Pedido por COP
            </ListItemText>
        </ListItem>
<ListItem button onClick={()=>listEvent('bystate')}>
    <ListItemIcon>
<LocationCityIcon/>
    </ListItemIcon>
    <ListItemText>
    Pedido por Ciudad
    </ListItemText>
</ListItem>
<ListItem button onClick={()=>listEvent('list')}>
    <ListItemIcon>
    <ListIcon/>
    </ListItemIcon>
    <ListItemText>
    Lista de pedidos
    </ListItemText>
</ListItem>




      </List>
    </div>
  );

  return (
    <div>
      <MenuIcon onClick={handleChangeDrawOpen}/>
        <Drawer 
        anchor='left'
        open={open}
        onClose={handleChangeDrawOpen}
        
        >
            {list()}
        </Drawer>
    </div>
  );
}
