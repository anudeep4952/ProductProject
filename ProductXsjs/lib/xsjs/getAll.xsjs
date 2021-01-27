/*eslint no-console: 0, no-unused-vars: 0, no-shadow: 0, new-cap: 0*/
/*eslint-env node, es6 */
"use strict";

let conn = $.hdb.getConnection();
let query =
	`SELECT * FROM "PRODUCTSSCHEMA_1"."Products" `;
let rs = conn.executeQuery(query);

$.response.contentType = "application/json;charset=UTF-8";	
$.response.headers.set("Access-Control-Allow-Origin", "*");
$.response.setBody(rs);
$.response.status = $.net.http.OK;