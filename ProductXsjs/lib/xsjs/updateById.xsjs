 
 
"use strict";

$.response.contentType = "application/json;charset=UTF-8";	
$.response.headers.set("Access-Control-Allow-Origin", "*");
$.response.status = $.net.http.OK;



let conn= $.hdb.getConnection();

const id = $.request.parameters.get('id');


var content = $.request.body.asString();


content = JSON.parse(content);


let query=`UPDATE "PRODUCTSSCHEMA_1"."Products"
 SET "Category"='${content["Category"]}',
	"MainCategory"='${content["MainCategory"]}',
	"SupplierName"='${content["SupplierName"]}',
	"Weight"=${content["Weight"]},
	"WeightUnit"='${content["WeightUnit"]}',
	"Description"='${content["Description"]}',
	"Name"='${content["Name"]}',
	"Price"=${content["Price"]},
	"Currency"='${content["Currency"]}',
	"DimensionWidth"=${content["DimensionWidth"]},
	"DimensionDepth"= ${content["DimensionDepth"]},
	"DimensionHeight"=${content["DimensionHeight"]},
	"DimensionUnit"='${content["DimensionUnit"]}'
	where ("ProductId"='${id}')`

let rs = conn.executeUpdate(query);

conn.commit();


$.response.setBody(rs);