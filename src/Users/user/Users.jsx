const Users = (props) => {
	const { items } = props;
	//const classes = useStyles();
	if (!items || items.length === 0) return <p>Can not find any items, sorry</p>;
	return (

        <div>
            {items && (
                <ul>
                {items.map(item => (
                    <li key={item.id}>{item.user_name}</li>
                ))}
                </ul>
            )}
        </div>

        // <Grid container spacing={5} alignItems="flex-end">
        //     {items.map((post) => {
        //         return (
        //             <Grid item key={post.id} xs={12} md={4}>
        //                 <Card sx={cardHeader}>
        //                     <Link
        //                         color="textPrimary"
        //                         href={'post/' + post.slug}
        //                         //className={classes.link}
        //                         sx={link}
        //                     >
        //                         <CardMedia
        //                             //className={classes.cardMedia}
        //                             //image="https://source.unsplash.com/random"
        //                             image={post.image}
        //                             title="Image title"
        //                             sx={cardMedia}
        //                         />
        //                     </Link>
        //                     <CardContent>
        //                         <Typography
        //                             gutterBottom
        //                             variant="h6"
        //                             component="h2"
        //                             //className={classes.postTitle}
        //                             sx={postTitle}
        //                         >
        //                             {post.title.substr(0, 50)}...
        //                         </Typography>
        //                         <div>
        //                             <Typography
        //                                 component="p"
        //                                 color="textPrimary"
        //                                 sx={postText}
        //                             ></Typography>
        //                             <Typography variant="p" color="textSecondary">
        //                                 {post.excerpt.substr(0, 60)}...
        //                             </Typography>
        //                         </div>
        //                     </CardContent>
        //                 </Card>
        //             </Grid>
        //         );
        //     })}
        // </Grid>
	
	);
};
export default Users;