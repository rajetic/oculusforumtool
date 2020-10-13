// ==UserScript==
// @name        Oculus Forum Tool
// @namespace   Kojack
// @description Oculus Forum Tool
// @include     https://forums.oculusvr.com/*
// @version     1.4
// @grant       none
// ==/UserScript==

// Oculus Forum Tool - Provides colour coding of posts on the Oculus forum
// Copyright (C) 2017 Kojack (rajetic@gmail.com)
//
// Oculus Forum Tool is released under the MIT License  
// https://opensource.org/licenses/MIT


var elements;
var postColours   = {admin:"#0000c0", mod:"#b05000", mine:"#00a0ff", banned:"#ffff00", jailed:"#a0a000"};
 
function getColour(cn)
{
	if(cn.search("Jailed")!=-1)
	{
		return "jailed";
	}
	if(cn.search("Banned")!=-1)
	{
		return "banned";
	}
	if(cn.search("Mine")!=-1)
	{
		return "mine";
	}
	if(cn.search("Rank-Admin")!=-1)
	{
		return "admin";
	}
	if(cn.search("Rank-Mod")!=-1)
	{
		return "mod";
	}
	return "";
}

elements = document.getElementsByTagName("LI");
for(var i=0;i<elements.length;++i)
{
	if(elements[i].className.search("ItemComment")!=-1) // These are replies in a thread.
	{
		var colour = postColours[getColour(elements[i].className)];
		if(colour!==undefined)
		{
			var borderElement = document.evaluate("./div[1]", elements[i], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			var fillElement = document.evaluate("./div[1]/div[2]", elements[i], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			borderElement.style.borderBottomColor = colour;
			borderElement.style.borderTopColor = colour;
			borderElement.style.borderLeftColor = colour;
			borderElement.style.borderRightColor = colour;
			fillElement.style.backgroundColor = colour;
		}
	}
	else if(elements[i].className.search("ItemDiscussion")!=-1) // These are subjects on the thread list.
	{
		var colour = postColours[getColour(elements[i].className)];
		var subjectElement = document.evaluate("./div[1]/div[1]/a[1]", elements[i], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
		subjectElement.style.color = colour;
	}
}

elements = document.getElementsByTagName("DIV");
for(var i=0;i<elements.length;++i)
{
	if(elements[i].className.search("ItemDiscussion")!=-1) // These are the opening posts of a thread.
	{
		var colour = postColours[getColour(elements[i].className)];
		if(colour!==undefined)
		{
			var borderElement = document.evaluate("./div[1]", elements[i], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			var fillElement = document.evaluate("./div[1]/div[1]", elements[i], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			borderElement.style.borderBottomColor = colour;
			borderElement.style.borderTopColor = colour;
			borderElement.style.borderLeftColor = colour;
			borderElement.style.borderRightColor = colour;
			fillElement.style.backgroundColor = colour;
		}
	}
}

elements=document.getElementsByClassName('LastCommentDate');
for (var i = 0; i < elements.length; ++i)
{
    elements[i].style.display='flex';
}
elements=document.getElementsByClassName('Meta-Discussion');
for (var i = 0; i < elements.length; ++i)
{
    elements[i].style.display='flex';
}
elements=document.getElementsByClassName('DiscussionScore');
for (var i = 0; i < elements.length; ++i)
{
    elements[i].style.flex='1 0 auto';
}
elements=document.getElementsByClassName('emoji');
for (var i = 0; i < elements.length; ++i)
{
    elements[i].style.height='20px';
}

elements = document.getElementsByClassName("MeMenu");
var gearbutton = document.evaluate("./span[4]/a", elements[0], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var spamqueue = document.evaluate("./span[4]/ul/li[4]/a/span", elements[0], null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var testalert = document.createElement("SPAN");
if(spamqueue!=null)
{
	testalert.className = "Alert";
	testalert.innerText = spamqueue.innerText;
	gearbutton.appendChild(testalert);  
}

