import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import getData from "../../until/getData";
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import Alert from '@material-ui/lab/Alert';
import { Button, Typography } from '@material-ui/core';
import sendData from '../../until/sendData';
const pending = '#FAE19E'
const arrived = '#B2FA9E'
const canceled = '#FA9E9E'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    
    backgroundColor: theme.palette.background.paper,
  },
  rootAlert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function FolderList() {
    const [data, setData] = React.useState(false)
    const [loading, setLoading] = React.useState(true);
  const classes = useStyles();
  useEffect(() => {

    getList()
  }, []);
const getList =()=>{
    const url =`/listapedidos/${localStorage.getItem('id')}`
    getData(url).then((response)=>{
        console.log(response)
        if(response&&response.length!==0){
            setData(response)
            
        }
        setLoading(false)
    })
}
const cancelOrder = (value)=>{
  const url ='/cancelarOrden'
  const data = JSON.stringify({
    id: value,
    estado: 'cancelado'
  })
  sendData(data, url).then((response)=>{
    if(response){
      getList()
      console.log('pedido cancelado')
    }
  })
}
if(loading){
    return (<Typography>Cargando...</Typography>)
}else{
    if(data){
        return (
            <List className={classes.root}>
                {data.map((item)=>{
                    let fecha = item.fechaArribo.split('T')
                    let dia = fecha[0]
                    let hora = fecha[1].split('.')[0]
                    console.log(dia, hora)
                    return( <ListItem style={{backgroundColor: item.estado==='pendiente'?pending:item.estado==='entregado'?arrived:canceled}}>
                        <ListItemAvatar>
                          <Avatar>
                            <LocalShippingIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={`Salida desde ${item.ciudadsalida}, destino: ${item.ciudadllegada}`} secondary={`Fecha llegada: ${dia} a las: ${hora}`} />
                        {item.estado==='entregado'||item.estado==='cancelado'?null:<Button color="secondary" variant="contained" onClick={()=>cancelOrder(item._id)}>Cancelar Pedido</Button>}
                      </ListItem>)
                    
                })}
        
            </List>
          );
    }else{
        return (
            <div className={classes.root}>
        
            <Alert variant="filled" severity="info">
              No haz realizado ningun pedido
            </Alert>
            
          </div>
        )
       
    }
}

}
