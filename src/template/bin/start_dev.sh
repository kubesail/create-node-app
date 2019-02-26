if [ $1 = "www" ]; then
   REACT_APP_LAUNCH_WWW=true react-scripts start
elif [ $1 = "api" ]; then
   nodemon src/api/index.js
else
   echo ""
   echo "Please specify a component to start, such as:"
   echo ""
   echo "    yarn start www"
   echo ""
   echo "--or--"
   echo ""
   echo "    yarn start api"
   echo ""
fi
