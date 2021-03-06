/**
 * ClickScript - ClickScript is a visual programming language. This is a 
 * data flow programming language running entirely in a web browser.
 * Copyright (C) 2012 Lukas Naef
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * @author lnaef
 * 
 * Class cs.system.Serializer 
 * 
 * @description: This is a helper class to serialize an DOM-Element.
 * It also Generates the singleton cs.global.serializer which is a helper for serialisation
 */
	
	dojo.provide("cs.system.Serializer");
	
	dojo.declare("cs.system.Serializer", null, {
		
		/**
		 * Linebreak symbol
		 */
		_linebreak : "\n",
		
		
		/**
		 * Spaces to format
		 */
		_space : "\t",
		_spaceRegex : /\n\t/g,
		 
		/**
		 * Next unique Id 
		 */
		_newUid : 1,
		
		/**
		 * Remove linebreak from the end of a_text if available
		 */
		_addSpacesOnEachLine : function(a_text){			
			return (a_text.lastIndexOf(this._linebreak)==a_text.length-this._linebreak.length) ? a_text.substring(0,a_text.length-this._linebreak.length) : a_text;
		},

		/**
		 * Returns a string with well formed xml, defined by tagname, attribute and child-content
		 * A single-tag only is printed if attributes are available. To force printing, set a_forceSingleTag.
		 * 
		 * @param a_tagname      {string}            : String of a starttag (e.g. "component")
		 * @param a_attribute    {array}  [optional] : Array of a attributes  (e.g. ['id':12])
		 * @param a_childsstring {string} [optional] : String for child tag (e.g. "<Socket uid='234'><test/></Socket>")
		 * @param a_forceSingleTag {boolean} [optional] : Prints a single Tag even if no attributes were added
		 * 
		 * The exmple would look like:
		 *    <component id="12">
		 *		 <Socket uid='234'><test/></Socket>
		 *    </component>
		 * 
		 * To get a single tag, just set a_childstring to "" or null
		 */
		serialize: function(a_tagname, a_attribute, a_childstring, a_forceSingleTag) {
			var out = "";
			var attributes = "";
			var forceSingleTag = a_forceSingleTag || false;
			
			// build attributes
			for (var key in a_attribute) {
				attributes += key + "=\"" + a_attribute[key] + "\" ";
			}
			attributes = dojo.trim(attributes);
			
			var opentag = "<" + a_tagname + " " + attributes;
			opentag = dojo.trim(opentag);
			
			if (a_childstring && a_childstring.length>0){
				// -> open and close tag
				out += this._space + opentag + ">" + this._linebreak; // starttag
				out += this._space + this._addSpacesOnEachLine(a_childstring).replace(this._spaceRegex,"\n"+this._space+this._space) + this._linebreak;
				out += this._space + "</" + a_tagname + ">" + this._linebreak;
				return out;
			} else if(attributes.length > 0 || forceSingleTag){
				// -> single tag
				return this._space + opentag+"/>" + this._linebreak;
			} else {
				return "";
			}
		},
		
		/**
		 * Returns a unique Id
		 */
		getUid : function(){
			var uid = this._newUid;
			this._newUid++;
			return uid;
		}
	});
	
	cs.global.serializer = new cs.system.Serializer();

	
	/**
	 * TIP: dojox.xml.DomParser.parse(xml)
	 */


	
