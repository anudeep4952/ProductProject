sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/BusyIndicator",
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	'sap/ui/core/Fragment'
], function (Controller,BusyIndicator,MessageToast,MessageBox,Fragment) {
	"use strict";

	return Controller.extend("ns.ProductUI.controller.View1", {
		
		onInit:function(){
			 var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			 this.onRefresh();
             var x=oRouter.getRoute("RouteView1").attachMatched(this._onRouteMatched, this);
		},
		
		_onRouteMatched: async function(oEvent) {
			
			this.onRefresh();
		},
		
		
	    getAllData: async function (){
		  var data1;  
		  await	 $.ajax({
			        url: "https://okwbsxlma7596cwsoject-productxsjs.cfapps.us10.hana.ondemand.com/xsjs/getAll.xsjs",
			        type: 'GET'
			     }).done((data)=>
			        {data1= data;}
			        ).fail((error)=>{
			        	BusyIndicator.hide();
			        	this.getView().byId('ProductTable').setVisible(true);
			        });
			     return data1;
		},
		
		
		
	   	onRefresh:async function(){
		
		    BusyIndicator.show();
            var res= await this.getAllData();
            BusyIndicator.hide();
            var  dataModel= new sap.ui.model.json.JSONModel(res);
		 	this.getView().byId('ProductTable').setModel(dataModel,"dataModel");
			this.getView().byId('ProductTable').setVisible(true);
		  	
		},
		
		handleRefreshButton : function(){
			this.onRefresh();
		},
	 
	    onPress1:function(oEvent){
                     var oItem = oEvent.getSource(); 
                     var obj=oItem.getBindingContext("dataModel").getProperty("ProductId");
                    
                     this.getOwnerComponent().getRouter().navTo("RouteView2",{object:JSON.stringify({ProductId:obj})});
            },
            
        
        handleAddButton : function(oEvent){
        	var dataModel={
		        	ProductId: "", 
		        	Category: "", 
		        	MainCategory: "", 
		        	SupplierName: "", 
		        	Weight: "",
					Category: "",
					Currency: "EUR",
					Description: "",
					DimensionDepth: "",
					DimensionHeight: "",
					DimensionUnit: "cm",
					DimensionWidth: "",
					MainCategory: "",
					Name: "",
					Price: "",
					ProductId: "",
					SupplierName: "",
					Weight: "",
					WeightUnit: "KG"
                };
            
            if (!this._addDialog) {
		        this._addDialog = sap.ui.xmlfragment("addFragment","ns.ProductUI.view.add",this);
		    }
		    
		    var  dataModel= new sap.ui.model.json.JSONModel(dataModel);
		   
		  	this._addDialog.setModel(dataModel,"dataModel");
		    
		    this._addDialog.open();
	    },
	    
	    onAddData: async function(oEvent){
		   	 var addDialog = oEvent.getSource().getParent();
		   	 var data=addDialog.oModels.dataModel.oData;
		   	 var id=data.ProductId;
		   	 
		   	 var jsonData=JSON.stringify(data);
		   	 
		   	 
		   	 BusyIndicator.show();
		   	 
		   	 
		   	 var result= await $.ajax({
		   	 	type:"POST",
		   	 	data:jsonData,
		   	 	crossDomain: true,
		   	 	url:"https://okwbsxlma7596cwsoject-productxsjs.cfapps.us10.hana.ondemand.com/xsjs/addData.xsjs",
		   	 }).done((dat)=>{
		   	 	
		   	 	BusyIndicator.hide();
		   	    addDialog.close();
		   	    this.onRefresh();
		   	    MessageBox.success("New product added.");

		   	 	
		   	 }).fail((error)=>{
		   	 	BusyIndicator.hide();
		   	    addDialog.close();
		   	    MessageBox.error("Request failed.Please try again.");
		   	 });
		   	 
		   },
	    
	    cancel : function(oEvent){ 
	            var addDialog = oEvent.getSource().getParent();
                addDialog.close();
	        },
		
	});
});