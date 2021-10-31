

import React from "react"

function AboutUs()
{ 
 return (
   <div className="d-flex flex-column text-center " >
      <h1>About Us</h1>
      <p>
      {/* <img src="https://img.icons8.com/color/48/000000/lol--v4.png"/> */}
      <img src="https://img.icons8.com/small/40/000000/chef-hat.png" alt=" &#8608;"/>

     	Baker Land is a brand that deals with the joy of baking,<br/>
       <hr className="aboutHr"/>
       &#8608; With us, anyone can make chef recipes, for each product you will receive recipes that suit him,<br/>
         as well as step-by-step explanation videos with our experts.<br/>
         <hr className="aboutHr"/>

     	&#8608; on our website you can prepare recipes according to the products you have in the pantry<br/>
        You can go to Recipes- According to your pantry, where you can choose the products you have at home<br/>
        and according to that you will receive suitable recipes.<br/>
        <hr className="aboutHr"/>
        
        <img src="https://img.icons8.com/color/50/000000/cookbook.png" alt=" &#8608;"/>
     	  if you have great recipes, do not hesitate to share them with us,<br/>
        Go to Recipes- Your Recipes - where you can enter the recipe and the steps of the recipe<br/>
        In addition you can also share your video preparing the recipe<br/>
         and if your recipe gets over 20 likes you can win a gift from us.
      
      </p>
 
  </div>
)
}
export default AboutUs