# CO2 emissions around the world

CO2 emissions trap heat on earth like a blanket, keeping in excess heat that would otherwise be 
radiated out into space. In other words, earth is on fire 🔥  

I wanted to create a visual that replicated the effect of CO2 emissions 
from earth which cause the globe to catch in metaphorical flames. I used data from various 
sources in gapminder to get CO2 emission information, and used an R library to sort the countries 
continent.

![landing view](/media/landing.png)

Upon viewing the site, viewers notice a globe on the right with what looks like CO2 clouds 
emitting from it, and a red fire-like graph surrounding the globe. I received feedback that 
the globe drew the most attention, so it was less effective to have the "mouse over..." 
instructions on the left of the page. Therefore, I incorporated the instructions onto 
the graph itself, overlayed on a faint black-and-white globe image to further deepen the narrative.

When the graph is moused-over, each country’s CO2 per capita contribution is highlighted in red, 
together with a progression graph from 2000 and 2018. Viewers can use this method to explore CO2 
emissions from different countries, or type in the search bar to find particular ones.

![search](/media/search.gif)

The data is sorted in increasing order within each continent so that viewers can easily compare 
between neighboring countries. I received feedback that the order of the continents could be 
clearer during my presentation, so I made sure that they better reflected their relative positions in real life.

On the left of the page, there is also a legend depicting how the circle sizes relate to tonnes 
of CO2 per person. I think circles are effective in this particular use case because of the 
natural connection to CO2 clouds.

I kept the color palette of the site relatively simple, and used gradients to represent depth.
For instance, the red flames around the circle is the total emissions in 2018, and in addition to 
the height of the curve, I also used the gradient to indicate how much emission is coming from 
that country. The taller the graph, the more red, or the hotter it becomes. This graph provides 
a visual comparison between countries and continents. For a more specific comparison, I used 
labels to allow viewers to find the actual amounts of emission from that country.

To strengthen the takeaway about how much pollution is being emitted, I created a 3D scene here 
which can be used to compare the volumes of CO2 emitted to the eiffel tower. Viewers can zoom out 
of this little window to see the relative size of CO2 emissions compared to the eiffel tower.

![3d](/media/3d.gif)

Using this system, we can gain some interesting insights. For instance, while China is a 
significant contributor to global CO2 emissions, its CO2 emission per person is relatively small.
The countries with the largest CO2 emissions per person include Qatar and Kuwait, while some other 
countries with larger CO2 emissions include Russia, Germany, and Japan.

This was an individual project which took 3 weeks to complete. I spent the most time processing 
the data, getting the data components to work together, figuring out SVG, and creating the interactive 3D legend.

Library / code credit: [Vincent Arel-Bundock](https://github.com/vincentarelbundock/countrycode),
[Rich Harris](https://github.com/Rich-Harris), [Matthias Stahl](https://github.com/higsch),
[Mr.doob](https://github.com/mrdoob), [Johnson Martin](https://blendswap.com/profile/122633),
and [turkkub](https://www.flaticon.com/authors/turkkub)