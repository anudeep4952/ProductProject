
"use strict";

let conn= $.hdb.getConnection();

const id = $.request.parameters.get('id');

let query=`DELETE FROM "PRODUCTSSCHEMA_1"."Products" where ("ProductId"='${id}')`;

let rs = conn.executeUpdate(query);

conn.commit();


$.response.contentType = "application/json;charset=UTF-8";	
$.response.headers.set("Access-Control-Allow-Origin", "*");
$.response.setBody(rs);
$.response.status = $.net.http.OK;