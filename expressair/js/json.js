// =========== btn_sub click ==============
$(".btn-header_sub").click( function(e){

     $(".section-header_left").addClass("search");
     $(".section-header").addClass("search");
     $(".section-ticket").addClass("search");
     $(".section-ticket_left").addClass("search");
      if ($(window).width() <= '1200'){
     $(".filter-icon").addClass("search");
     
     };
     if ($(window).width() <= '990'){
			$(".header-form-edit").addClass("search");
     $(".header-form").addClass("search");
     }
   //   	$(".progress-bar").animate({width : 100+"%" }, 1000);
   //   	setTimeout(function(){
   //   	  	$(".progress").css("display", "none" );
			// }, 1500);     
			$.getJSON('/mydata.json', function(data) {
	Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};
function CountMinutes( i, f, n ){
return new Date(Date.parse(data.ParsedData.PricedItineraries[i].Directions[n].Segments[f].FlightDuration)).getMinutes() + new Date(Date.parse(data.ParsedData.PricedItineraries[i].Directions[n].Segments[f].FlightDuration)).getHours() * 60;
}
function CountMinutesStop( num, f ,n ){

return Math.trunc((new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].Segments[f+1].DepartureDateTime)) - new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].Segments[f].ArrivalDateTime)))/ 60000 )
}

function StopDuration(i , f, n){
	var min = CountMinutesStop(i, f, n) % 60;
	if (min == 0) {
		min = min + "0";
	}
	return Math.trunc(CountMinutesStop(i, f, n) / 60) + " ч "+ min + " мин";
}

function FlightDuration(n, num){
 // var day = new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].ArrivalDateTime)).format("d") - new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].DepartureDateTime)).format("d");
 var day = 0;
 if(day == 0){
 	day = "";
 }else{
 	day = day + " д ";
 }
var hour = Math.trunc((new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].ArrivalDateTime)) - new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].DepartureDateTime)))/3600000);
var min = ((new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].ArrivalDateTime)) - new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].DepartureDateTime)))%3600000)/60000;
 return day+hour+" ч "+min+" мин";
}

function SegmentDuration(i , n){
	var segment = data.ParsedData.PricedItineraries[i].Directions[n].Segments.length;
	if (segment == 1) {
	var write = "<div class='trip-segment_connector' style='flex-grow: 1;' data-toggle='tooltip' title='в пути "+ new Date(Date.parse(data.ParsedData.PricedItineraries[i].Directions[n].Segments[0].FlightDuration)).format("HH:MM")+"'></div>";
 }else{
 	var write = "<div class='trip-segment_connector' style='flex-grow: "+ CountMinutes(i, 0, n)+";' data-toggle='tooltip' title='в пути "+ new Date(Date.parse(data.ParsedData.PricedItineraries[i].Directions[n].Segments[0].FlightDuration)).format("HH:MM")+"'></div><div data-iatas='"+ data.ParsedData.PricedItineraries[i].Directions[n].Segments[0].ArrivalAirport+"' class='trip-segment_stop'style='flex-grow: "+ CountMinutesStop(i,0,n)+";' data-toggle='tooltip' title='Пересадка: "+  StopDuration(i,0, n) +"'></div><div class='trip-segment_connector'style='flex-grow:"+ CountMinutes(i, 1, n)+";' data-toggle='tooltip' title='в пути "+ new Date(Date.parse(data.ParsedData.PricedItineraries[i].Directions[n].Segments[1].FlightDuration)).format("HH:MM")+"'></div>"
 }
	return write;
}
function Baggages(i,n){
	var weight = data.ParsedData.PricedItineraries[i].Directions[n].Segments[0].Baggages[0].Quantity;
	if (weight == 0) {
		var write = "<div class='section-ticket_weight-num none'>&#215</div><div class='section-ticket_weight-text'>Нет багажа</div></div>";
	}else if (weight == 1) {
	 var write = "<div class='section-ticket_weight-num'>х 1</div><div class='section-ticket_weight-text'>Одно багажное место</div></div>";
	}else{
		var write = "<div class='section-ticket_weight-num'>10 кг</div><div class='section-ticket_weight-text'>Багаж до 10 кг</div></div>";
	}
	return write;
}
for (var i = 0; i < data.ParsedData.PricedItineraries.length; ++i) {

if(data.ParsedData.PricedItineraries[i].Directions[0] == null){
	var n=1;
}else{
	var n=0;
}

$(".section-ticket_right").append("<div class='section-ticket_item ' item-number='"+i+"'> <div class='section-ticket_item-left'> <div class='section-ticket_weight'>"+ Baggages(i ,n) +"<button type='button' class='btn section-ticket_btn' data-bs-toggle='modal' data-bs-target='#modal-reserve'><div class='section-ticket_btn-sum'>"+ data.ParsedData.PricedItineraries[i].PriceInformation.BaseFare +" ₸</div><div class='section-ticket_btn-text'>Оставить заявку на бронь</div></button> </div><div class='section-ticket_item-right'> <div class='section-ticket_item-trip'> <div class='item-trip_header'> <div class='item-trip_carriers'> <img class='trip-carriers_img' src='img/carrier1.jpg' alt=''> <img class='trip-carriers_img' src='img/carrier1.jpg' alt=''> </div><div class='item-trip-label_wrap'></div></div><div class='item-trip_outer'> <div class='item-trip_schedule'> <div class='item-trip_time'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[i].Directions[n].DepartureDateTime)).format("HH:MM") +"</div><div class='item-trip_city'>"+ data.ParsedData.PricedItineraries[i].Directions[n].DepartureAirportRu +"</div><div class='item-trip_date'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[i].Directions[n].DepartureDateTime)).format("d mmm yyyy, ddd") +"</div></div><div class='item-trip_segment-wrap'> <div class='trip-segment_duration'>"+ FlightDuration(n, i) +"</div><div class='trip-segment_path'> <div class='trip-segment_endpoint'> <img src='img/trip-plane.png' class='trip-segment_plane' alt=''> <div class='trip-segment_airport'>"+ data.ParsedData.PricedItineraries[i].Directions[n].DepartureAirport +"</div></div>"+ SegmentDuration(i, n)+"<div class='trip-segment_endpoint'> <img src='img/trip-plane.png' class='trip-segment_plane __arrival' alt=''> <div class='trip-segment_airport __arrival'>"+ data.ParsedData.PricedItineraries[i].Directions[n].ArrivalAirport +"</div></div></div></div><div class='item-trip_schedule'> <div class='item-trip_time'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[i].Directions[n].ArrivalDateTime)).format("HH:MM") +"</div><div class='item-trip_city'>"+ data.ParsedData.PricedItineraries[i].Directions[n].ArrivalAirportRu +"</div><div class='item-trip_date'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[i].Directions[n].ArrivalDateTime)).format("d mmm yyyy, ddd") +"</div></div></div>"+ DirectionsTicket(i, n) + "</div></div><div class='clear'></div></div>");

function DirectionsTicket(i,n){
	if (data.ParsedData.PricedItineraries[i].Directions.length == 1 || n == 1) {
		 return "";
	}else{
		return "<hr class='item-trip_hr'><div class='item-trip_outer'> <div class='item-trip_schedule'> <div class='item-trip_time'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[i].Directions[1].DepartureDateTime)).format("HH:MM") +"</div><div class='item-trip_city'>"+ data.ParsedData.PricedItineraries[i].Directions[1].DepartureAirportRu +"</div><div class='item-trip_date'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[i].Directions[1].DepartureDateTime)).format("d mmm yyyy, ddd") +"</div></div><div class='item-trip_segment-wrap'> <div class='trip-segment_duration'>"+ FlightDuration(1, i) +"</div><div class='trip-segment_path'> <div class='trip-segment_endpoint'> <img src='img/trip-plane.png' class='trip-segment_plane' alt=''> <div class='trip-segment_airport'>"+ data.ParsedData.PricedItineraries[i].Directions[1].DepartureAirport +"</div></div>"+ SegmentDuration(i, 1)+"<div class='trip-segment_endpoint'> <img src='img/trip-plane.png' class='trip-segment_plane __arrival' alt=''> <div class='trip-segment_airport __arrival'>"+ data.ParsedData.PricedItineraries[i].Directions[1].ArrivalAirport +"</div></div></div></div><div class='item-trip_schedule'> <div class='item-trip_time'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[i].Directions[1].ArrivalDateTime)).format("HH:MM") +"</div><div class='item-trip_city'>"+ data.ParsedData.PricedItineraries[i].Directions[1].ArrivalAirportRu +"</div><div class='item-trip_date'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[i].Directions[1].ArrivalDateTime)).format("d mmm yyyy, ddd") +"</div></div></div>";
	}
}

$(".section-ticket_right").append("<div class='section-ticket_item __mobile' item-number='"+i+"'><div class='item-trip-mobile__header'><div class='item-trip_price'>"+ data.ParsedData.PricedItineraries[i].PriceInformation.BaseFare +"₸</div><div class='item-trip_carriers'><img class='trip-carriers_img __mobile' src='img/carrier1.jpg' alt=''><img class='trip-carriers_img __mobile' src='img/carrier1.jpg' alt=''></div></div><div class='item-trip-mobile_outer'><div class='item-trip-mobile_li'><div class='item-trip-mobile_caption'>"+ data.ParsedData.PricedItineraries[i].Directions[n].DepartureAirport +" - "+ data.ParsedData.PricedItineraries[i].Directions[n].ArrivalAirport +"</div><div class='item-trip-mobile_text'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[i].Directions[n].DepartureDateTime)).format("HH:MM") +" – "+ new Date(Date.parse(data.ParsedData.PricedItineraries[i].Directions[n].ArrivalDateTime)).format("HH:MM") +"</div></div><div class='item-trip-mobile_li'><div class='item-trip-mobile_caption'>В пути</div><div class='item-trip-mobile_text'>" + FlightDuration(n, i)+"</div></div><div class='item-trip-mobile_li'><div class='item-trip-mobile_caption'>"+ SegmentCount(i, n) +"</div><div class='item-trip-mobile_text'>"+ SegmentAirport(i, n) +"</div></div>"+ DirectionsMobile(i, n) +"</div></div>");


function DirectionsMobile(i, n){
	if (data.ParsedData.PricedItineraries[i].Directions.length == 1 || n == 1) {
		 return "";
	}else{
		return "<div class='item-trip-mobile_li'><div class='item-trip-mobile_caption'>"+ data.ParsedData.PricedItineraries[i].Directions[1].DepartureAirport +" - "+ data.ParsedData.PricedItineraries[i].Directions[1].ArrivalAirport +"</div><div class='item-trip-mobile_text'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[i].Directions[1].DepartureDateTime)).format("HH:MM") +" – "+ new Date(Date.parse(data.ParsedData.PricedItineraries[i].Directions[1].ArrivalDateTime)).format("HH:MM") +"</div></div><div class='item-trip-mobile_li'><div class='item-trip-mobile_caption'>В пути</div><div class='item-trip-mobile_text'>"+ FlightDuration(1, i)+"</div></div><div class='item-trip-mobile_li'><div class='item-trip-mobile_caption'>"+ SegmentCount(i, 1) +"</div><div class='item-trip-mobile_text'>"+ SegmentAirport(i, 1) +"</div></div>"
	};
};

function SegmentCount(i, n){
	var segment = data.ParsedData.PricedItineraries[i].Directions[n].Segments.length;
	if (segment == 1) {
		return "0 пересадок";
	}else{
		return segment-1 + "пересадка";
	}
}

function SegmentAirport(i, n){
	var segment = data.ParsedData.PricedItineraries[i].Directions[n].Segments.length;
	if (segment == 1) {
		return "---";
	}else{
		return data.ParsedData.PricedItineraries[i].Directions[n].Segments[0].ArrivalAirport;
	}
}

};

$(".section-ticket_item[item-number = '0']").find(".item-trip-label_wrap").html("<div class='item-trip_label'>Самый удобный</div>");
$(".section-ticket_item.__mobile[item-number = '0']").find(".item-trip-mobile__header").html("<div class='item-trip_lable'>Самый дешёвый</div>");
	
});

$("body").tooltip({
    selector: '[data-toggle="tooltip"]'
});


});

// =========== /btn_sub click ==============

// ===========modal-ticket_airport ==============

$(document).on('click' , '.section-ticket_item-right', TicketModalShow);
$(document).on('click' , '.section-ticket_item.__mobile', TicketModalShow);

function TicketModalShow(){
	ticket.show();
	
	if ($(window).width() > '990'){
	var num = $(this).parents().attr('item-number');
}else{
	var num = $(this).attr('item-number');
}

$.getJSON('/mydata.json', function(data) {

	Date.prototype.format = function (mask, utc) {
    return dateFormat(this, mask, utc);
};

if(data.ParsedData.PricedItineraries[num].Directions[0] == null){
	var n=1;
}else{
	var n=0;
}

$(".modal-ticket_right").html(" <div class='modal-ticket_airport'>"+ data.ParsedData.PricedItineraries[num].Directions[n].DepartureAirportRu +" – "+ data.ParsedData.PricedItineraries[num].Directions[n].ArrivalAirportRu +"</div><div class='modal-ticket_time'>"+ FlyDuration(n, num) +" в пути</div><div class='modal-ticket_item'> <div class='modal-ticket_header'> <img class='modal-ticket_airport-img' src='img/airport.jpg' alt=''> <div class='modal-ticket_airport'>"+ data.ParsedData.PricedItineraries[num].ValidatingAirlineName +"</div><div class='modal-ticket_time'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].Segments[0].FlightDuration)).format("HH ч MM мин")+" в полёте</div></div><div class='modal-ticket_schedule'> <div class='modal-ticket_schedule-item'> <div class='modal-ticket_schedule-caption'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].Segments[0].DepartureDateTime)).format("HH:MM") +"</div><div class='modal-ticket_schedule-text'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].Segments[0].DepartureDateTime)).format("d mmm, ddd") +"</div></div><div class='modal-ticket_schedule-item'> <div class='modal-ticket_schedule-caption'>"+ data.ParsedData.PricedItineraries[num].Directions[n].Segments[0].DepartureAirportRu +"</div><div class='modal-ticket_schedule-text'>"+ data.ParsedData.PricedItineraries[num].Directions[n].Segments[0].DepartureAirportRu +", "+ data.ParsedData.PricedItineraries[num].Directions[n].Segments[0].DepartureAirport +"</div></div><div class='modal-ticket_schedule-item'> <div class='modal-ticket_schedule-caption'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].Segments[0].ArrivalDateTime)).format("HH:MM") +"</div><div class='modal-ticket_schedule-text'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].Segments[0].ArrivalDateTime)).format("d mmm, ddd") +"</div></div><div class='modal-ticket_schedule-item'> <div class='modal-ticket_schedule-caption'>"+ data.ParsedData.PricedItineraries[num].Directions[n].Segments[0].ArrivalAirportRu +"</div><div class='modal-ticket_schedule-text'>"+ data.ParsedData.PricedItineraries[num].Directions[n].Segments[0].ArrivalAirportRu +", "+ data.ParsedData.PricedItineraries[num].Directions[n].Segments[0].ArrivalAirport +"</div></div></div>" + SegmentModal(num, n) + "</div></div></div>"+DirectionsModal(num));

function CountMinutesStop( num, f ,n ){
return Math.trunc((new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].Segments[f+1].DepartureDateTime)) - new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].Segments[f].ArrivalDateTime)))/ 60000 )
}

function FlyDuration(n, num){
 // var day = new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].ArrivalDateTime)).format("d") - new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].DepartureDateTime)).format("d");
 var day = 0;
 if(day == 0){
 	day = "";
 }else{
 	day = day + " д ";
 }
var hour = Math.trunc((new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].ArrivalDateTime)) - new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].DepartureDateTime)))/3600000);
var min = ((new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].ArrivalDateTime)) - new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].DepartureDateTime)))%3600000)/60000;
 return day+hour+" ч "+min+" мин";
}
function StopDuration(i , f, n){
	var min = CountMinutesStop(i, f, n) % 60;
	if (min == 0) {
		min = min + "0";
	}
	return Math.trunc(CountMinutesStop(i, f, n) / 60) + " ч "+ min + " мин";
}

function SegmentModal(num, n){
	var segment = data.ParsedData.PricedItineraries[num].Directions[n].Segments.length;
	if (segment == 1) {
		 return "";
	}else{
		
		return "<div class='modal-ticket_change'> <img class='modal-ticket_change-img' src='img/people.png' alt=''> <div class='modal-ticket_change-text'>Пересадка в "+ data.ParsedData.PricedItineraries[num].Directions[n].Segments[1].DepartureAirportRu+" </div><div class='modal-ticket_change-time'>" +StopDuration(num,0, n)+"</div></div><div class='modal-ticket_header'> <img class='modal-ticket_airport-img' src='img/airport.jpg' alt=''> <div class='modal-ticket_airport'>"+ data.ParsedData.PricedItineraries[num].ValidatingAirlineName +"</div><div class='modal-ticket_time'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].Segments[1].FlightDuration)).format("HH ч MM мин")+" в полёте</div></div><div class='modal-ticket_schedule'> <div class='modal-ticket_schedule-item'> <div class='modal-ticket_schedule-caption'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].Segments[1].DepartureDateTime)).format("HH:MM") +"</div><div class='modal-ticket_schedule-text'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].Segments[1].DepartureDateTime)).format("d mmm, ddd") +"</div></div><div class='modal-ticket_schedule-item'> <div class='modal-ticket_schedule-caption'>"+ data.ParsedData.PricedItineraries[num].Directions[n].Segments[1].DepartureAirportRu +"</div><div class='modal-ticket_schedule-text'>"+ data.ParsedData.PricedItineraries[num].Directions[n].Segments[1].DepartureAirportRu +", "+ data.ParsedData.PricedItineraries[num].Directions[n].Segments[1].DepartureAirport +"</div></div><div class='modal-ticket_schedule-item'> <div class='modal-ticket_schedule-caption'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].Segments[1].ArrivalDateTime)).format("HH:MM") +"</div><div class='modal-ticket_schedule-text'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[n].Segments[1].ArrivalDateTime)).format("d mmm, ddd") +"</div></div><div class='modal-ticket_schedule-item'> <div class='modal-ticket_schedule-caption'>"+ data.ParsedData.PricedItineraries[num].Directions[n].Segments[1].ArrivalAirportRu +"</div><div class='modal-ticket_schedule-text'>"+ data.ParsedData.PricedItineraries[num].Directions[n].Segments[1].ArrivalAirportRu +", "+ data.ParsedData.PricedItineraries[num].Directions[n].Segments[1].ArrivalAirport +"</div></div>"
	}
}


function DirectionsModal(num){
	if (data.ParsedData.PricedItineraries[num].Directions.length == 1 || n == 1) {
		 return "";
	}else{
		return " <div class='modal-ticket_airport'>"+ data.ParsedData.PricedItineraries[num].Directions[1].DepartureAirportRu +" – "+ data.ParsedData.PricedItineraries[num].Directions[1].ArrivalAirportRu +"</div><div class='modal-ticket_time'>"+ FlyDuration(1, num) +" в пути</div><div class='modal-ticket_item'> <div class='modal-ticket_header'> <img class='modal-ticket_airport-img' src='img/airport.jpg' alt=''> <div class='modal-ticket_airport'>"+ data.ParsedData.PricedItineraries[num].ValidatingAirlineName +"</div><div class='modal-ticket_time'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[1].Segments[0].FlightDuration)).format("HH ч MM мин")+" в полёте</div></div><div class='modal-ticket_schedule'> <div class='modal-ticket_schedule-item'> <div class='modal-ticket_schedule-caption'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[1].DepartureDateTime)).format("HH:MM") +"</div><div class='modal-ticket_schedule-text'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[1].Segments[0].DepartureDateTime)).format("d mmm, ddd") +"</div></div><div class='modal-ticket_schedule-item'> <div class='modal-ticket_schedule-caption'>"+ data.ParsedData.PricedItineraries[num].Directions[1].DepartureAirportRu +"</div><div class='modal-ticket_schedule-text'>"+ data.ParsedData.PricedItineraries[num].Directions[1].DepartureAirportRu +", "+ data.ParsedData.PricedItineraries[num].Directions[1].DepartureAirport +"</div></div><div class='modal-ticket_schedule-item'> <div class='modal-ticket_schedule-caption'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[1].ArrivalDateTime)).format("HH:MM") +"</div><div class='modal-ticket_schedule-text'>"+ new Date(Date.parse(data.ParsedData.PricedItineraries[num].Directions[1].Segments[0].ArrivalDateTime)).format("d mmm, ddd") +"</div></div><div class='modal-ticket_schedule-item'> <div class='modal-ticket_schedule-caption'>"+ data.ParsedData.PricedItineraries[num].Directions[1].ArrivalAirportRu +"</div><div class='modal-ticket_schedule-text'>"+ data.ParsedData.PricedItineraries[num].Directions[1].ArrivalAirportRu +", "+ data.ParsedData.PricedItineraries[num].Directions[1].ArrivalAirport +"</div></div></div>" + SegmentModal(num, 1) + "</div></div></div>"
	}
}


$(".modal-ticket_price").html(data.ParsedData.PricedItineraries[num].PriceInformation.BaseFare+ "₸");
$(".modal-btn").html(data.ParsedData.PricedItineraries[num].PriceInformation.BaseFare + " ₸");

});
};

// =========== /modal-ticket_airport ==============
