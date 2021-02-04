

"use strict";

$.response.contentType = "application/json;charset=UTF-8";	
$.response.headers.set("Access-Control-Allow-Origin", "*");

let conn = $.hdb.getConnection();

var content = $.request.body.asString();

content = JSON.parse(content);


let query =
	`INSERT INTO "DEMOHANADB_1"."Products" VALUES(
	'${content["ProductId"]}',
	'${content["Category"]}',
	'${content["MainCategory"]}',
	'${content["SupplierName"]}',
	 ${content["Weight"]},
	'${content["WeightUnit"]}',
	'${content["Description"]}',
	'${content["Name"]}',
	 ${content["Price"]},
	'${content["Currency"]}',
     ${content["DimensionWidth"]},
	 ${content["DimensionDepth"]},
	 ${content["DimensionHeight"]},
	'${content["DimensionUnit"]}'
) `;


let rs = conn.executeUpdate(query);

conn.commit();



$.response.setBody(rs);
$.response.status = $.net.http.OK;

