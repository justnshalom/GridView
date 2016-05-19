//Common variable Declaration
var und = "undefined";
var bindrules = [];
var keepsettings = [];
var editclass = 'editit';
var deleteclass = 'deleteit';
var viewclass = 'viewit';
var tablehiddenclass = "hidden";
var custombuttonclass = 'custombutton';5
var searchclass = "bindsearch";
var searchinputclass = "bindsearchinputclass";
var moredivhtml = [];
var bindmanagerdiv = "bindmanagerdiv";
var bindnew = [];
var bindtablediv = "bindrows";
var tabletoexcelclass = "tabletoexcel";
var tabletoprintclass = "tabletoprint";
var tablecustomrow = 'customrow';
var tablenavbar = 'navbar';
var autolistdivhtml = [];
var editmode = false;
var submitmode = false;
var savedropdowns = {};
var savedropdownsnewrequest = {};
var paging = false;
var pageno = 0;
var closepaging = false;
function showhidepagination( cl,th )
{
    th.removeClass( "hidden hiddenpagerows" ).addClass( "shownpagerows" );
    if ( cl.find( '.pagination li a:visible:last' ).offset().top > cl.find( '.pagination' ).offset().top )
    {
        th.addClass( "hidden hiddenpagerows" ).removeClass( "shownpagerows" );
        closepaging = true;
    }
}
function makepaginationresponsive(cl,active,paging )
{
    closepaging = false;
    if (!defined(paging)|| paging == null )
    {
        paging = null;
    }
    cl.find( '.pagination li' ).addClass( "hidden hiddenpagerows" ).removeClass( "shownpagerows" );
    if ( cl.find( '.pagination li.active' ).length > 0 )
    {
        cl.find( '.pagination li.active' ).removeClass( "hidden hiddenpagerows" ).addClass( "shownpagerows" );
    }
    else
    {
        cl.find( '.pagination li[rel=1]' ).removeClass( "hidden hiddenpagerows" ).addClass( "shownpagerows" );
    }
    cl.find( '.pagination li.nextlink,.pagination li.prevlink' ).removeClass( "hidden hiddenpagerows" ).addClass( "shownpagerows" );
    var leftpagingcompleted = false;
    var length = cl.find( '.pagination li' ).length;
    var right = active+1;
    var left = active;
    for ( i = 1; i <= length;i++)
    {
        if ( closepaging == false )
        {
            if ( ( i % 2 == 1 && right <= length && ( paging == null || paging == "right" || leftpagingcompleted == true ) ) || left <= 0 || ( paging == "right" && right <= length ) )
            {
                var curobj = cl.find( '.pagination li[rel=' + ( right - 1 ) + ']' );

                showhidepagination( cl, curobj );
                right++;
                if ( right > length )
                {
                    cl.find( '.pagination li.nextlink' ).addClass( "hidden hiddenpagerows" ).removeClass( "shownpagerows" );
                }

            }
            else if ( ( i % 2 == 0 && left > 0 ) || right >= length || ( paging == null || paging == "left" && left > 0 ) )
            {
                var curobj = cl.find( '.pagination li[rel=' + ( left - 1 ) + ']' );

                showhidepagination( cl, curobj );
                left--;
                if ( left == 0 )
                {
                    leftpagingcompleted = true;
                    cl.find( '.pagination li.prevlink' ).addClass( "hidden hiddenpagerows" ).removeClass( "shownpagerows" );

                }
            }
        }
    }
    
}
/*Customizable area*/
function allowselector( string )
{
    var selectorallowedcharacters = new RegExp( $.ui.autocomplete.escapeRegex( string ), "gi" );
    return selectorallowedcharacters.test()
}
function geticon( value, editclass, editiconclass, label, id, name, href, target)
{
    name = name != "" ? "data-name='" + name + "'" : "";
    target = ( target != null && defined( target ) ) ? ' target="' + target + '"' : '';
    href = ( href != null && defined( href ) ) ? target + ' href="' + href + '"' : "";
    return '<a class="' + editclass + '" data-id="' + id + '" ' + name + '  ' + href + ' data-value="' + value + '" >' + label + ' <i class="' + editiconclass + '"></i> </a>';
}
function getmultiicon( editclass, editiconclass, label, array, href, target )
{
    name = "data-name='json'";
    target = ( target != null && defined( target ) ) ? ' target="' + target + '"' : '';
    href = (href != null && defined(href)) ? target+' href="' + href + '"' : "";
    return '<a class="' + editclass + '" ' + name + '  ' + href + ' data-json="' + JSON.stringify(array).replace(/"/g, "'") + '" >' + label + ' <i class="' + editiconclass + '"></i> </a>';
}

/*Customizable area ends*/

/* Developer Mode Part*/
function appendjs( link )
{
    $( 'body' ).append( '<script type="text/javascript" src="' + $( '#contenturl' ).val() + link + '")"></script>' );
}
function startloading()
{
    $( 'body' ).css( 'cursor', 'progress' );
}
function stoploading()
{
    $( 'body' ).css( 'cursor', 'auto' );
}
function developmentmode( mode )
{
    if ( mode == true )
    {
        setcache( 'developmentmode', mode );
        appendjs( 'js/development.js' );
    }
    else
    {
        setcache( 'developmentmode', mode );
    }

}
/* Developer Mode Part ends*/
function defined( variable )
{
    if ( typeof variable != und )
    {
        return true;
    }
    return false;
}

function readURL( input )
{
    if ( input.files && input.files[0] )
    {
        var reader = new FileReader();

        reader.onload = function ( e )
        {
            $("#" + $(input).attr('data-imageid')).attr("src", e.target.result).show();;

        }

        reader.readAsDataURL( input.files[0] );
    }
}

function consoleit( text, type, heading )
{
    if ( getcache( 'developmentmode' ) == "false" )
    {
        return false;
    }
    if ( typeof heading == 'undefined' || heading == '' )
    {
        heading = "Common Js Notification"
    }
    //Color for success case
    var color = "green";
    switch ( type )
    {
        //Error case
        case "e":
            {
                color = "red";
                break;
            }
            //Warning case
        case "w":
            {
                color = "orange";
                break;
            }

    }

    console.log( '%c ' + heading + ' %c' + '\n-------------------\n ' + '%c' + text, 'color: #4991EA', 'color: black', 'color: ' + color );

}

function checkloopthrough( array, name )
{

    var loopvar = false;
    $.each( array, function ( i, v )
    {
        if ( i == name )
        {
            loopvar = array[i];

        }
        if ( v instanceof Object )
        {
            if ( ( loopv = checkloopthrough( v, name ) ) != false )
            {

                loopvar = loopv;
            }
        }
    } );
    return loopvar;
}
var bindmanagerhtml = {};

$.fn.bindmanager = function ( opt, callback )
{
    var callbackfunction = callback;
    var consolelog = "";
    var rowdiv = $(this);
    var id = rowdiv.attr( 'id' );
    var closest = rowdiv.closest( 'div' );

    var dv = 'div';
    var start = '<';
    var end = '>';
    var endstart = '</';
    var classequal = ' class="';
    var classequalend = '"';
    if ( rowdiv.length == 0 ) { return false };
    var tagname = rowdiv[0].tagName.toLowerCase();
    var stn = $.fn.bindmanager.defaults;
    switch ( tagname )
    {
        case dv:
            {
                stn = $.extend( {}, stn, {
                    tbody: dv,
                    thead: dv,
                    tr: dv,
                    td: dv
                } );
            }
    }
    consolelog += "You Chosed Tag '" + tagname + "' For Binding (supported div,table) \n";
    stn = $.extend( {}, stn, opt );
    var list = typeof rowdiv.data( 'list' ) != und && rowdiv.data( 'list' ) != und ? rowdiv.data( 'list' ) : stn.list;


    list == stn.list ? consolelog += "Json Data List Name Not Defined or Defined as Default Name = '" + stn.list + "'\n" : consolelog += "Json Data List Name = '" + stn.list + "'\n";

    var keepname = list;
    keepname += typeof id != und ? "_" + id : null;
    if ( typeof bindnew[keepname] == 'undefined' )
    {
        //Set For Getting New/Fresh Data
        bindnew[keepname] = true;
        if (rowdiv.html() != '') {
            bindmanagerhtml[keepname] = rowdiv.html();
          
        }
    }
    else
        if ( stn.bindfresh == false )
        {
            //Set For Getting with already setted default Data
            bindnew[keepname] = false;
        }
        else
        {
            //Set For Getting New/Fresh Data
            bindnew[keepname] = true;
        }

    var appendhtml = "";
    if (defined(bindmanagerhtml[keepname]))
    {
        appendhtml = bindmanagerhtml[keepname];
    }

    opt == null || typeof opt == "undefined" ? stn = keepsettings[keepname] : keepsettings[keepname] = stn;

    var bindform = $( stn.bindsearchformclass );
    var depend = [];
    var dependtables = [];
    if ( typeof rowdiv.attr( 'data-serverdepend' ) != und )
    {
        depend.push( rowdiv.attr( 'data-serverdepend' ) );
    }
    if ( stn.serverdepend != '' )
    {
        depend.push( stn.serverdepend );
    }
  
    var headclass = '.' + stn.headclass.replace( ' ', '.' );
    var bodyclass = '.' + stn.bodyclass.replace( ' ', '.' );
    var rowsclass = '.' + stn.rowsclass.replace( ' ', '.' );
    var headrowsclass = '.' + stn.headrowsclass.replace( ' ', '.' );
    var last = ':last';
    var space = " ";
    stn.tableclass += " " + bindtablediv;

    rowdiv.attr( 'data-editflag', stn.editflag );
    rowdiv.attr( 'data-addflag', stn.addflag );
    rowdiv.data( 'list', list );
    rowdiv.addClass( stn.tableclass );
    var postdata = {};
    var formvariablesok = true;
    var issubmit = false;
    var isreset = false;
    if ( $( depend.join().split( ',' ).join( "[type=submit]," ) + "[type=submit]" ).length > 0 )
    {
         issubmit = true;
         
    }
    if ( $( depend.join().split( ',' ).join( "[type=reset]," ) + "[type=reset]" ).length > 0 )
    {
        isreset = true;
    }
    //These server dependent using for get server values from array through search
    $( depend.join( ',' ) ).each( function ()
    {

        var tag = $(this).attr( 'type' );

        switch (tag) {
            //Checkbox
            case "checkbox":
                {
                    postdata[$(this).attr('name')] = $(this).prop('checked');
                    break;
                }
                //Radio Button
            case "radio":
                {
                    postdata[$(this).attr('name')] = $('[name='+$(this).attr('name')+']:checked').val();
                    break;
                }
            case "submit":
                {
                    break;
                }
            default:
                {
                    postdata[$( this ).attr( 'name' )] = $( this ).val();
                    if($( this ).hasClass( 'hasDatepicker' )|| defined($(this).attr('data-dateformat')))
                    {
                        if ( defined( $( this ).attr( 'name' ) ) && $( this ).val() != '' )
                        {
                            var dateformat = "";
                            if ( defined( $( this ).attr( 'data-dateformat' ) ) )
                            {
                                dateformat = $( this ).attr( 'data-dateformat' );
                            }
                            else
                                if ( $( this ).hasClass( 'hasDatepicker' ) )
                                {
                                    dateformat = $( this ).datepicker( 'option', 'dateFormat' );
                                }
                                else if ( defined( DateFormatforScripts ) )
                                {
                                    dateformat = DateFormatforScripts;

                                }
                            if ( dateformat != '' )
                            {
                                postdata[$( this ).attr( 'name' )] = $.datepicker.formatDate( "mm/dd/yy", $.datepicker.parseDate( dateformat, $( this ).val() ) );
                             
                            }

                        }
                    } 

                    
                    break;
                }

        }
        if ( bindnew[keepname] == true )
        {

            /*automatically setting event for bind manager get data from server
        rowdiv.attr('data-serverdepend')*/
            switch ( tag )
            {
                //Checkbox
                case "text":
                    {
                        $( this ).blur( function ( e )
                        {
                            
                            var allosubmit = issubmit;
                           
                            if ( defined( e.originalEvent ) && allosubmit != true )
                            {// e.stopPropagation();
                                rowdiv.bindmanager();
                            }
                        } )
                        break;
                    }
              
                case "submit":
                    {
                        $( this ).click( function ( e )
                        {
                            e.preventDefault();
                            rowdiv.bindmanager();
                        } )
                        break;
                    }
                case "reset":
                    {
                        $( this ).click( function ( e )
                        {
                            e.preventDefault();
                            resetform($(this).closest('form'));
                            rowdiv.bindmanager();  
                        } )
                        break;
                    }
                default:
                    {
                        $( this ).change( function ( e,forcechange )
                        {
                            var allosubmit = issubmit;
                          
                            if ((defined(e.originalEvent) || (forcechange==true)) && allosubmit != true)
                            {
                              //  e.stopPropagation();
                                rowdiv.bindmanager();
                            }
                        } )
                        break;
                    }

            }
           
           

        }

        if ( $( this ).val() == '' || $( this ).val() == null )
        {

            if ( defined($( this ).attr( 'required' ) ))
            {

                consoleit( 'Server dependent Fields for Bind Manager Not Filled .. It will Bind on the change event of dependent server variables', 'e', 'BindManager Error' );
                formvariablesok = false;
            }
        }
    } );

    if ( formvariablesok == false )
    {
        return false;
    }
    if ( typeof rowdiv.attr( 'data-dependtable' ) != und )
    {
        return false;
    }
    if ( paging == true )
    {
        var bindpaging = true;
        var bindpageno = pageno;
        pageno = 0;
        paging = false;
        postdata["paging"] = true;
        postdata["pageno"] = bindpageno;
        postdata["perpage"] = stn.paginationperpage;


    }
    else
    {
        var bindpageno =0 ;
        var bindpaging = false;
        rowdiv.html( '' );
    }
    
    $.post( rowdiv.data( 'action' ), postdata, function ( data )
    {
        if ( bindpaging == false )
        {
            rowdiv.html( '' );
        }
        var cl = $('#' + id).closest('div');
        if ( data.Error == false )
        {
            var listfrom = list;
            var listvariable="";
            var getvar=list.split( '[' )[0];
            if (getvar.length == 2 )
            {
                listfrom =getvar[0] ;
                listvariable = getvar[1];
            }
           
            if (data[list] != null && data[list].length > 0)
            {
                if ( IsJsonString( data[list] ) )
                {
                    var mydatalist = $.parseJSON( data[list] );
                }
                else
                {
                    var mydatalist = data[list];
                }
                var rowsTotal = mydatalist.length;

                var ishtmlnotexist = appendhtml.replace( /[\r\n\s]+/g, "" ) == "" ? true : false;
                if ( bindpaging == false )
                {

                    rowdiv.attr( 'data-noresultmessage', stn.noresultmessage );
                    if ( ishtmlnotexist == true )
                    {

                        //consoleit(start + stn.thead +classequal + stn.headclass +classequalend+ end+start + stn.tr + classequal+ stn.rowsclass +classequalend+ end+endstart + stn.tr + end+endstart  + stn.thead + end);
                        //Header eg:<thead class="thead"><tr class="tr"></tr></thead>
                        rowdiv.append( start + stn.thead + classequal + stn.headclass + classequalend + end + start + stn.tr + classequal + stn.headrowsclass + classequalend + end + endstart + stn.tr + end + endstart + stn.thead + end );
                        //consoleit(start +stn.tbody + classequal + stn.bodyclass+classequalend + end+endstart + stn.tbody + end);
                        //Body eg:<tbody class="tbody"></tbody>
                        rowdiv.append( start + stn.tbody + classequal + stn.bodyclass + classequalend + end + endstart + stn.tbody + end );

                    }
                    else
                    {
                        rowdiv.append( appendhtml );
                        if ( rowdiv.find( '#Index,[name=Index],.Index' ).length > 0 )
                        {
                            stn.labelarray["Index"] = "Index";
                        }
                        if ( rowdiv.find( '#Edit,[name=Edit],.Edit' ).length > 0 )
                        {
                            stn.labelarray["Edit"] = "Edit";
                        }
                    }
                   

                    cl.addClass( bindmanagerdiv );
                    rowdiv.attr( 'data-paginationperpage', stn.paginationperpage )
                    cl.find( '.' + tablenavbar ).remove();
                    cl.append( '<nav class="' + tablenavbar + '" data-perpage="' + stn.paginationperpage + '"><ul class="pagination"></ul></nav>' );
                   
                    var rowsShown = stn.paginationperpage;

                    if ( defined(data.Count)&&data.Count != 0 )
                    {
                        rowsTotal = data.Count;
                    }
                    var numPages = ( rowsTotal / rowsShown ).toFixed( 1 );
                    if ( numPages > 1 )
                    {
                        for ( i = 0; i < numPages; i++ )
                        {
                            var pageNum = i + 1;
                            cl.find( '.' + tablenavbar + ' ul' ).append( '<li class="shownpagerows paginationitem" rel="' + (i+1) + '"><a>' + pageNum + '</a></li> ' );
                        }
                    }
                    cl.find( '.' + tablenavbar + ' ul' ).prepend( '<li rel="0" class="page-item prevlink  hidden"><a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span><span class="sr-only">Previous</span>    </a>  </li>' );

                    cl.find( '.' + tablenavbar + ' ul' ).append( '<li rel="' + cl.find( '.pagination li' ).length + '" class="page-item nextlink hidden"><a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span><span class="sr-only">Next</span>    </a>  </li>' );

                    if ( cl.find( '.pagination' ).height() > 34 )
                    {
                       // cl.find( '.pagination' ).css( { height: '34px', overflow: 'hidden' } );
                     
     makepaginationresponsive( cl ,1);
 }
                }
                else
                {
                    cl.find( '#' + id + ' tbody tr.showit' ).css( 'opacity', '0.0' ).hide();
                }

                var realindex = 1;
                if ( bindpageno != 0 )
                {
                    realindex = (bindpageno * stn.paginationperpage)+1;
                }


                if (rowsTotal > 0) {
                    $.each(mydatalist, function (i, v) {

                        $.each(v, function (i2, v2) {
                            if (i == 0) {
                                if (ishtmlnotexist == false) 
                                    {
                                        var arrayelements = rowdiv.find('#' + i2 + ',[name=' + i2 + '],.' + i2 + '');
                                        if( arrayelements.length>0)
                                        {
                                            stn.labelarray[i2]=i2;
                                        }
                                     

                                }
                                var searchinput = bindform.find('#' + i2 + ',[name=' + i2 + '],.' + i2 + '');
                                if (searchinput.length > 0) {
                                    searchinput.addClass(i2 + ' ' + searchinputclass);
                                    searchinput.attr('data-searchclass', i2);
                                    if (!defined(searchinput.attr('data-searchquery'))) {
                                        searchinput.attr('data-searchquery', 'equals');
                                    }


                                    //searchinput.attr('id',searchinput.attr('id')==und?i2:searchinput.attr('id'));
                                    searchinput.attr('name', searchinput.attr('name') == und ? i2 : searchinput.attr('name'));
                                    var oneanothersearchinputinotherform = $('[name=' + i2 + '],[data-value=' + i2 + '],[id=' + i2 + '],.' + i2);
                                    if (oneanothersearchinputinotherform.length > 0) {
                                        if (oneanothersearchinputinotherform.hasClass('autolist')) {
                                            searchinput.addClass('autolist');
                                            if (!defined(searchinput.attr('data-json'))) {
                                                searchinput.attr('data-json', oneanothersearchinputinotherform.attr('data-json'));
                                            }
                                            if (!defined(searchinput.attr('data-value'))) {
                                                searchinput.attr('data-value', oneanothersearchinputinotherform.attr('data-value'));
                                            }
                                            if (!defined(searchinput.attr('data-text'))) {
                                                searchinput.attr('data-text', oneanothersearchinputinotherform.attr('data-text'));

                                            }
                                            if (!defined(searchinput.attr('data-serverdepend'))) {
                                                if (defined(oneanothersearchinputinotherform.attr('data-serverdepend'))) {
                                                    searchinput.attr('data-serverdepend', oneanothersearchinputinotherform.attr('data-serverdepend'));
                                                }


                                            }
                                        }
                                    }

                                    stn.searcharray[i2] = $.extend({}, stn.searcharray[i2], searchinput.getAttributes());
                                    applyattributes(searchinput, stn.searcharray[i2]);

                                }
                                if (searchinput.hasClass('autolist') && !defined(searchinput.attr('data-autolistinitialized'))) {
                                    autolistserverdependency(searchinput);
                                    getautolistjson(searchinput);
                                }
                            }
                            if (v2 instanceof Object) {
                                $.each(v2, function (i3, v3) {
                                    if (typeof i3 == "string") {
                                        if (i == 0) {
                                            var searchinput = bindform.find('#' + i3 + ',[name=' + i3 + '],.' + i3 + '');
                                            if (searchinput.length > 0) {
                                                searchinput.attr('id', searchinput.attr('id') == und ? i3 : searchinput.attr('id'));
                                                searchinput.attr('name', searchinput.attr('name') == und ? i3 : searchinput.attr('name'));
                                                stn.searcharray[i3] = {
                                                    object: searchinput,
                                                    id: searchinput.attr('id'),
                                                    name: searchinput.attr('name'),
                                                    classname: searchinput.attr('class'),
                                                    type: searchinput[0].tagName.toLowerCase()
                                                }
                                            }
                                        }
                                        if (v3 != null && v3 != "") {
                                            mydatalist[i][i3] = v3;
                                        }
                                    }
                                });
                            }
                        });

                        /*
                        */
                        //Body Rows eg:<tr class="tr"></tr>
                        //consoleit(start + stn.tr + classequal + stn.rowsclass + classequalend+ end+endstart+ stn.tr + end);

                        if ( ishtmlnotexist == true  )
                        {
                            rowdiv.find( bodyclass ).append( start + stn.tr + classequal + stn.rowsclass + " showit " + classequalend + " data-trindex='"+realindex+"' " + end + endstart + stn.tr + end );
                        }
                        else
                        if (i != 0 && ishtmlnotexist == false) {
                            rowdiv.append(appendhtml);
                        }
                        $.each(stn.labelarray, function (i2, v2) {
                            //Use for table heading

                            if (typeof stn.labelarray[i2] != und) {
                                if ( i == 0 && ishtmlnotexist == true && bindpaging == false )
                                {
                                    switch (i2) {
                                        case 'Edit':
                                            {
                                                var label = stn.labelarray[i2].label;
                                                if (typeof stn.labelarray[i2].label == und) {
                                                    label = stn.labelarray[i2][0].label;
                                                    if (typeof stn.labelarray[i2][0].label == und) {
                                                        consoleit('Pls Define edit Label in First array', "e");
                                                    }
                                                }
                                                rowdiv.find(headclass).find(headrowsclass).append(start + stn.td + classequal + stn.colmclass + space + editclass + classequalend + end + label + endstart + stn.td + end);
                                                break;
                                            }
                                        case 'Link':
                                            {
                                                var label = stn.labelarray[i2].label;
                                                if (typeof stn.labelarray[i2].label == und) {
                                                    label = stn.labelarray[i2][0].label;
                                                    if (typeof stn.labelarray[i2][0].label == und) {
                                                        consoleit('Pls Define edit Label in First array', "e");
                                                    }
                                                }
                                                rowdiv.find(headclass).find(headrowsclass).append(start + stn.td + classequal + stn.colmclass + space + editclass + classequalend + end + label + endstart + stn.td + end);
                                                break;

                                            }
                                        case 'ViewLink':
                                            {
                                                var label = stn.labelarray[i2].label;
                                                if (typeof stn.labelarray[i2].label == und) {
                                                    label = stn.labelarray[i2][0].label;
                                                    if (typeof stn.labelarray[i2][0].label == und) {
                                                        consoleit('Pls Define edit Label in First array', "e");
                                                    }
                                                }
                                                rowdiv.find(headclass).find(headrowsclass).append(start + stn.td + classequal + stn.colmclass + space + viewclass + classequalend + end + label + endstart + stn.td + end);
                                                break;
                                            }
                                        case 'Custom':
                                            {
                                                rowdiv.find( headclass ).find( headrowsclass ).append( start + stn.td + classequal + stn.colmclass + space + custombuttonclass + classequalend + end + stn.labelarray[i2].label + endstart + stn.td + end );
                                                break;
                                            }
                                        case 'View':
                                            {
                                                var label = stn.labelarray[i2].label;
                                                if (typeof stn.labelarray[i2].label == und) {
                                                    label = stn.labelarray[i2][0].label;
                                                    if (typeof stn.labelarray[i2][0].label == und) {
                                                        consoleit('Pls Define View Label in First array', "e");
                                                    }
                                                }
                                                rowdiv.find(headclass).find(headrowsclass).append(start + stn.td + classequal + stn.colmclass + space  + viewclass + classequalend + end + label + endstart + stn.td + end);
                                                break;
                                            }

                                        case 'Delete':
                                            {
                                                rowdiv.find(headclass).find(headrowsclass).append(start + stn.td + classequal + stn.colmclass + space + deleteclass + classequalend + end + stn.labelarray[i2].label + endstart + stn.td + end);
                                                break;
                                            }

                                        default:
                                            {
                                                //Header Columns eg:<td class="td">CompanyId</td>
                                                //consoleit(start + stn.td + classequal + stn.colmclass + classequalend+end + i2 + endstart + stn.td + end);
                                                if (stn.labelarray[i2] instanceof Object) {
                                                    rowdiv.find(headclass).find(headrowsclass).append(start + stn.td + classequal + stn.colmclass + space + i2 + classequalend + end + stn.labelarray[i2].label + endstart + stn.td + end);
                                                }
                                                else {
                                                    if (stn.labelarray[i2] == 'hidden') {
                                                        rowdiv.find(headclass).find(headrowsclass).append(start + stn.td + classequal + stn.colmclass + space + stn.labelarray[i2] + space + i2 + classequalend + end + stn.labelarray[i2] + endstart + stn.td + end);
                                                    }
                                                    else {
                                                        rowdiv.find(headclass).find(headrowsclass).append(start + stn.td + classequal + stn.colmclass + space + i2 + classequalend + end + stn.labelarray[i2] + endstart + stn.td + end);

                                                    }
                                                }

                                            }
                                    }
                                }
                                
                                if(ishtmlnotexist == false)
                                {

                                    var htmlelement = rowdiv.find('#' + i2 + ',[name=' + i2 + '],.' + i2 + '').eq(i);

                                }
                                //Use for table Rows
                                switch (i2) {
                                    case 'Edit':
                                        {
                                            if (ishtmlnotexist == true) {
                                                if (typeof stn.labelarray[i2].label == und) {
                                                    $.each(stn.labelarray[i2], function (n, vl) {
                                                        stn.labelarray[i2][n]['value'] = mydatalist[i][vl.id];
                                                    })
                                                    rowdiv.find(bodyclass).find(rowsclass + last).append(start + stn.td + classequal + stn.colmclass + classequalend + end + getmultiicon(stn.editclass + space + editclass, stn.editiconclass, stn.editlabel, stn.labelarray[i2]) + endstart + stn.td + end);

                                                }
                                                else {
                                                    rowdiv.find(bodyclass).find(rowsclass + last).append(start + stn.td + classequal + stn.colmclass + classequalend + end + geticon(mydatalist[i][stn.labelarray[i2].id], stn.editclass + space + editclass, stn.editiconclass, stn.editlabel, stn.labelarray[i2].id, stn.labelarray[i2].name) + endstart + stn.td + end);
                                                }
                                            }
                                            else
                                            {
                                                var value = mydatalist[i][htmlelement.attr('data-id')]
                                                if (!defined(mydatalist[i][htmlelement.attr('data-id')]))
                                                {
                                                    consoleit("Pls add edit variables like data-id and data-name for getting and posting values", "e");
                                                }
                                                htmlelement.addClass(stn.editclass + space + editclass).attr('data-value', mydatalist[i][htmlelement.attr('data-id')]);
                                            }
                                            break;
                                        }
                                    case 'Link':
                                        {
                                            if (!defined(stn.labelarray[i2].label)) {
                                                $.each(stn.labelarray[i2], function (n, vl) {
                                                    stn.labelarray[i2][n]['value'] = mydatalist[i][vl.id];
                                                })
                                                if (defined(stn.labelarray[i2].link)) {
                                                    rowdiv.find( bodyclass ).find( rowsclass + last ).append( start + stn.td + classequal + stn.colmclass + classequalend + end + getmultiicon( stn.editclass + space + editclass, stn.editiconclass, stn.editlabel, stn.labelarray[i2], stn.labelarray[i2].link, stn.labelarray[i2].target ) + endstart + stn.td + end );
                                                }

                                            }
                                            else {
                                                if (defined(stn.labelarray[i2].link)) {
                                                    rowdiv.find( bodyclass ).find( rowsclass + last ).append( start + stn.td + classequal + stn.colmclass + classequalend + end + geticon( mydatalist[i][stn.labelarray[i2].id], stn.editclass + space + editclass, stn.editiconclass, stn.editlabel, stn.labelarray[i2].id, stn.labelarray[i2].name, stn.labelarray[i2].link, stn.labelarray[i2].target) + endstart + stn.td + end );
                                                }
                                            }

                                            break;
                                        }

                                    case 'Custom':
                                        {
                                            rowdiv.find( bodyclass ).find( rowsclass + last ).append( start + stn.td + classequal + stn.colmclass + classequalend + end + geticon( mydatalist[i][stn.labelarray[i2].id], stn.custombuttonclass + space + custombuttonclass, stn.custombuttoniconclass, stn.custombuttonlabel, stn.labelarray[i2].id, stn.labelarray[i2].name ) + endstart + stn.td + end );
                                            break;
                                        }
                                    case 'ViewLink':
                                        {
                                            if (!defined(stn.labelarray[i2].label)) {
                                                $.each(stn.labelarray[i2], function (n, vl) {
                                                    stn.labelarray[i2][n]['value'] = mydatalist[i][vl.id];
                                                })
                                                if (defined(stn.labelarray[i2].link)) {
                                                    rowdiv.find(bodyclass).find(rowsclass + last).append(start + stn.td + classequal + stn.colmclass + classequalend + end + getmultiicon(stn.viewclass + space + viewclass, stn.viewiconclass, stn.viewlabel, stn.labelarray[i2], stn.labelarray[i2].link, stn.labelarray[i2].target) + endstart + stn.td + end);
                                                }

                                            }
                                            else {
                                                if (defined(stn.labelarray[i2].link)) {
                                                    rowdiv.find(bodyclass).find(rowsclass + last).append(start + stn.td + classequal + stn.colmclass + classequalend + end + geticon(mydatalist[i][stn.labelarray[i2].id], stn.viewclass + space + viewclass, stn.viewlabel, stn.viewlabel, stn.labelarray[i2].id, stn.labelarray[i2].name, stn.labelarray[i2].link, stn.labelarray[i2].target) + endstart + stn.td + end);
                                                }
                                            }

                                            break;
                                        }
                                    case 'View':
                                        {
                                            if (typeof stn.labelarray[i2].label == und) {
                                                $.each(stn.labelarray[i2], function (n, vl) {
                                                    stn.labelarray[i2][n]['value'] = mydatalist[i][vl.id];
                                                })
                                                rowdiv.find(bodyclass).find(rowsclass + last).append(start + stn.td + classequal + stn.colmclass + classequalend + end + getmultiicon(stn.viewclass + space  + viewclass, stn.viewiconclass, stn.viewlabel, stn.labelarray[i2]) + endstart + stn.td + end);

                                            }
                                            else {
                                                rowdiv.find(bodyclass).find(rowsclass + last).append(start + stn.td + classequal + stn.colmclass + classequalend + end + geticon(mydatalist[i][stn.labelarray[i2].id], stn.viewclass + space + viewclass, stn.viewlabel, stn.viewlabel, stn.labelarray[i2].id, stn.labelarray[i2].name) + endstart + stn.td + end);
                                            }
                                            break;
                                        }

                                    case 'Delete':
                                        {
                                            rowdiv.find(bodyclass).find(rowsclass + last).append(start + stn.td + classequal + stn.colmclass + classequalend + end + geticon(mydatalist[i][stn.labelarray[i2].id], stn.deleteclass + space + deleteclass, stn.deleteiconclass, stn.deletelabel, stn.labelarray[i2].id, stn.labelarray[i2].name) + endstart + stn.td + end);
                                            break;
                                        }
                                    case 'Index':
                                        {
                                            if (ishtmlnotexist == true) {
                                                rowdiv.find( bodyclass ).find( rowsclass + last ).append( start + stn.td + classequal + stn.colmclass + space + i2 + classequalend + ' data-val="' + ( realindex ) + '" ' + end + ( realindex ) + endstart + stn.td + end );
                                            }
                                            else
                                            {
                                                htmlelement.html(i+1);

                                            }
                                            break;
                                        }
                                    default:
                                        {
                                            if (ishtmlnotexist == true) 
                                            {
                                                if (typeof mydatalist[i][i2] == und) {
                                                    mydatalist[i][i2] = checkloopthrough(mydatalist[i], i2)
                                                }
                                                if (stn.labelarray[i2] instanceof Object) {
                                                    if (defined(stn.labelarray[i2].fieldjoin)) {
                                                        var fieldjoin = $(stn.labelarray[i2].fieldjoin);

                                                        if (mydatalist[i][i2] == false || mydatalist[i][i2] == "false" || mydatalist[i][i2] == null) {
                                                            if (defined(fieldjoin.attr('data-allownulljoin'))) {
                                                                mydatalist[i][i2] = fieldjoin.attr('data-allownulljoin');
                                                            }
                                                            if (defined(fieldjoin.attr('data-customnullvalue'))) {
                                                                mydatalist[i][i2] = fieldjoin.attr('data-customnullvalue');
                                                            }
                                                        }
                                                        var textbox = fieldjoin.find('option[value=' + mydatalist[i][i2] + ']');

                                                        //var textbox=fieldjoin.find( 'option[value=' + mydatalist[i][i2] + ']' );
                                                        if (textbox.length == 0) {
                                                            fieldjoin.attr('data-fieldjoin', '.' + i2).attr('data-fieldjointable', '#' + id).addClass('fieldjoin');

                                                        }
                                                        else {
                                                            mydatalist[i][i2] = textbox.text();
                                                        }

                                                        rowdiv.find(bodyclass).find(rowsclass + last).append(start + stn.td + classequal + stn.colmclass + space + i2 + classequalend + ' data-val="' + mydatalist[i][i2] + '" ' + end + mydatalist[i][i2] + endstart + stn.td + end);
                                                    }

                                                    if (defined(stn.labelarray[i2].format) && mydatalist[i][i2] != null) {
                                                        if (mydatalist[i][i2].length > 4 && mydatalist[i][i2].split('/Date(').length > 1) {
                                                            mydatalist[i][i2] = $.datepicker.formatDate(stn.labelarray[i2].format, new Date(parseInt(mydatalist[i][i2].replace('/Date(', '').replace(')/', ''))));
                                                        }
                                                        rowdiv.find(bodyclass).find(rowsclass + last).append(start + stn.td + classequal + stn.colmclass + space + i2 + classequalend + ' data-val="' + mydatalist[i][i2] + '" ' + end + mydatalist[i][i2] + endstart + stn.td + end);

                                                    }
                                                    if (defined(stn.labelarray[i2].html)) {
                                                        rowdiv.find(bodyclass).find(rowsclass + last).append(start + stn.td + classequal + stn.colmclass + space + i2 + classequalend + ' data-val="' + mydatalist[i][i2] + '" ' + end + stn.labelarray[i2].html[mydatalist[i][i2]] + endstart + stn.td + end);
                                                    }
                                                    if (defined(stn.labelarray[i2].imageroot)) {
                                                        if (mydatalist[i][i2] == null || mydatalist[i][i2] == "") {
                                                            rowdiv.find(bodyclass).find(rowsclass + last).append(start + stn.td + classequal + stn.colmclass + space + i2 + classequalend + ' data-val="' + mydatalist[i][i2] + '" ' + end + '<span class="' + stn.outerimageclass + '"></span>' + endstart + stn.td + end);
                                                        }
                                                        else {
                                                            rowdiv.find(bodyclass).find(rowsclass + last).append(start + stn.td + classequal + stn.colmclass + space + i2 + classequalend + ' data-val="' + mydatalist[i][i2] + '" ' + end + '<span class="' + stn.outerimageclass + '"><img class="' + stn.imageclass + '" src="' + stn.labelarray[i2].imageroot + mydatalist[i][i2] + '" /></span>' + endstart + stn.td + end);
                                                        }
                                                    }
                                                }
                                                else {
                                                    //Body Columns eg:<td class="td">Flag</td>
                                                    //consoleit(start + stn.td + classequal + stn.colmclass + classequalend+end + v2 + endstart + stn.td + end);
                                                    if (stn.labelarray[i2] == 'hidden') {
                                                        rowdiv.find(bodyclass).find(rowsclass + last).append(start + stn.td + classequal + stn.colmclass + space + stn.labelarray[i2] + space + i2 + classequalend + ' data-val="' + mydatalist[i][i2] + '" ' + end + mydatalist[i][i2] + endstart + stn.td + end);
                                                    }
                                                    else {
                                                        var text = (mydatalist[i][i2] != null) ? mydatalist[i][i2] : "";
                                                        rowdiv.find(bodyclass).find(rowsclass + last).append(start + stn.td + classequal + stn.colmclass + space + i2 + classequalend + ' data-val="' + mydatalist[i][i2] + '" ' + end + text + endstart + stn.td + end);
                                                    }
                                                }
                                            }
                                            else
                                            {
                                                if ( defined( htmlelement[0] ) )
                                                {
                                                    var tag = htmlelement[0].tagName.toLowerCase();
                                                    switch ( tag )
                                                    {
                                                        case 'img':
                                                            {
                                                                if ( !defined( htmlelement.attr( "data-rooturl" ) ) )
                                                                {
                                                                    consoleit( "You define 'data-rooturl' attr in element", w );
                                                                    htmlelement.attr( 'src', mydatalist[i][i2] );
                                                                }
                                                                else
                                                                {
                                                                    var fileImagerootUrl = htmlelement.attr( "data-rooturl" );
                                                                    htmlelement.attr( 'src', fileImagerootUrl + mydatalist[i][i2] );
                                                                }
                                                            }
                                                            break;
                                                        default: htmlelement.html( mydatalist[i][i2] ).val( mydatalist[i][i2] );
                                                    }
                                                }
                                                
                                            }
                                
                                }
                            }
                        }
                            // if (typeof stn.labelarray['edit'] != 'undefined') { }
                            
                        });

                        $.each(stn.searcharray, function (i2, v2) {

                            //Use for hidden table heading
                            if (typeof stn.searcharray[i2] != und) {
                                if (i == 0) {
                                    if (rowdiv.find(headclass).find(rowsclass).find('.' + i2).length > 0) {
                                        rowdiv.find(headclass).find(rowsclass).find('.' + i2).addClass(searchclass);
                                    }
                                    else {
                                        rowdiv.find(headclass).find(rowsclass).append(start + stn.td + classequal + stn.colmclass + space + i2 + space + tablehiddenclass + space + searchclass + classequalend + end + stn.searcharray[i2].label + endstart + stn.td + end);
                                    }
                                }
                            }
                            //Use for hidden table Rows
                            if (rowdiv.find(bodyclass).find(rowsclass + last).find('.' + i2).length > 0) {
                                rowdiv.find(bodyclass).find(rowsclass + last).find('.' + i2).addClass(searchclass).attr('data-val', mydatalist[i][i2]).attr('data-class', i2);
                            }
                            else {
                                var attributes = {};
                                attributes['data-val'] = mydatalist[i][i2];
                                attributes['data-class'] = i2;
                                rowdiv.find(bodyclass).find(rowsclass + last).append(start + stn.td + classequal + stn.colmclass + space + i2 + space + tablehiddenclass + space + searchclass + classequalend + putattributesfromobject(attributes) + end + mydatalist[i][i2] + endstart + stn.td + end);
                            }
                            // if (typeof stn.labelarray['edit'] != 'undefined') { }
                        });
                        realindex++;

                    });
                }
                rowdiv.trigger('aftertablebind', data);
                cl.find( '#' + id + ' tbody tr' ).hide();
                cl.find( '#' + id + ' tbody tr' ).slice( 0, rowsShown ).show();
                var startItem = ( bindpageno * stn.paginationperpage ) + 1;
                var endItem = realindex;

                cl.find( '#' + id + ' tbody tr.showit' ).hide()
       .filter( function ( index )
       {
           return $( this ).attr( "data-trindex" ) >= startItem && $( this ).attr( "data-trindex" ) < endItem;
       } )
       .css( 'display', 'table-row' );
                cl.css( 'min-height', cl.height() );
                
                cl.find( '.' + tablenavbar + ' li[rel=' + (bindpageno+1) + ']' ).addClass( 'active' );
                var totalrows = 0;
                var tdees = "";
                if ( bindpaging == false && defined( rowdiv.attr( 'data-excelaction' ) ) )
                {
                    totalrows++;
                    tdees += '<td ><a  class="btn btn-primary btn-sm ' + tabletoexcelclass + '" href="' + rowdiv.attr( 'data-excelaction' ) + '"><i class="glyphicon glyphicon-list-alt"></i> Export To Excel</a></td>';
                }
                if ( bindpaging == false && defined( rowdiv.attr( 'data-print' ) ) )
                {
                    totalrows++;
                    tdees += '<td><a class="btn btn-primary btn-sm ' + tabletoprintclass + '"><i class="glyphicon glyphicon-print"></i> Print</a></td>';
                }
                if ( totalrows > 0 )
                {
                    var len = rowdiv.find( 'thead td:visible' ).length;
                    if ( totalrows < len )
                    {
                        tdees = '<td class="blank" colspan="' + ( len - totalrows ) + '"></td>' + tdees;
                    }
                    rowdiv.prepend( '<thead class="' + tablecustomrow + '"><tr>' + tdees + '</tr></thead>' );
                }
            }
            else
            {
                cl.find( '.' + tablenavbar ).remove();
                rowdiv.append( '<tbody><tr><td >' + stn.noresultmessage + '</td></tr></tbody>' );
            }
            rowdiv.trigger('afterbind', data);
        }
        else
        {
            cl.find('.' + tablenavbar).remove();
            rowdiv.append('<tbody><tr><td >' + data.Message + '</td></tr></tbody>');
        }
        if ( defined( callbackfunction ) && typeof  callbackfunction =='function' )
        {
            callbackfunction();
        }
        
        if (defined(stn.callback) && typeof stn.callback == 'function') {
            stn.callback();
        }

    } );
   
    if ( stn.console == true )
    {
        consoleit( consolelog, 's', keepname.replace( "_", "#" ) );
    }
    bindnew[keepname] = false;
    return rowdiv;
};
$.fn.bindmanager.defaults = {
    tableclass: 'table-hover table-striped',
    headclass: 'thead',
    bodyclass: 'tbody',
    rowsclass: 'tr',
    headrowsclass: 'tr',
    colmclass: 'td',
    thead: 'thead',
    tbody: 'tbody',
    tr: 'tr',
    th: 'th',
    td: 'td',
    list: 'Rows',
    labelarray: {/*
        UserName: "User Name",
        Name: 'Name',
        IsActive: 'Status',
        Edit: {
            label: "Edit",
            id: "UserId",
            name: "UserId"
        },
        Delete: {
            label: "Delete",
            id: "UserId",
            name: "UserId"
        },
        View: {
            label: "View",
            id: "UserId",
            name: "UserId"
        },*/
    },
    searcharray: {
        /*eg:
        UserName:{
        type:text/type:select,
        id:"YourId",
        classname:"YourClass",
        label:"Label For Input"
        ,,,,any attributes to searchbox will appear in it
        }*/
    },
    custombuttonlabel: 'Select',
    custombuttonclass: 'custom',
    custombuttoniconclass: 'glyphicon glyphicon-eye-open',

    bindsearchformclass: ".filterBlock",
    addflag: '0',
    editclass: 'edit1',
    editiconclass: 'fa fa-pencil-square-o',
    viewlabel: 'View',
    viewclass: 'edit1 view1',
    viewiconclass: 'glyphicon glyphicon-eye-open',
    editlabel: 'Edit',
    editflag: '1',
    deleteclass: 'deleteme',
    deleteiconclass: 'delete glyphicon glyphicon-remove',
    outerimageclass:'tourThumb',
    imageclass:"",
    deletelabel: '',
    paginationperpage: 10,
    console: true,
    serverdepend: '',
    bindfresh: false,
    noresultmessage: "There are No Results Found",
    callback:""
};
/*Append all attributes base on values*/
function putattributesfromobject( array )
{
    var attr = " ";
    $.each( array, function ( ind, vl )
    {
        attr += ind + '="' + vl + '" ';
    } );
    return attr;
}
function applyattributes( input, array )
{
    $.each( array, function ( ind, vl )
    {
        switch ( ind )
        {
            case 'classname':
                {
                    input.addClass( vl );

                    break;
                }
            case 'object':
                {
                    break;
                }
            default:
                {
                    input.attr( ind, vl );
                }
        }


    } );


}
$.fn.getAttributes = function ()
{
    var attributes = {};

    if ( this.length )
    {
        attributes['object'] = this;
        $.each( this[0].attributes, function ( index, attr )
        {
            switch ( attr.name )
            {
                case 'class':
                    {
                        attributes['classname'] = attr.value;
                        break;
                    }
                default:
                    {
                        attributes[attr.name] = attr.value;
                    }
            }

        } );
    }

    return attributes;
};


/*From Json Data this function pass to alert box if error occured or not*/
function managedata( jsondata, alertbox, timeout )
{

    if ( jsondata.Error == false )
    {
        if ( jsondata.Message != "" )
        {
            alerts( alertbox, jsondata.Message, timeout, "s" );
        }
    }
    else
    {
        alerts( alertbox, jsondata.Message, timeout, "e" );
    }


}
/*Javscript Notifications if enabled based on different types error(e),warning(w),Success(default)*/
function notifyit( message, alertfor )
{


    var options = {
        body: message,
        //icon: theIcon
    }

    switch ( alertfor )
    {
        //Error case
        case "e":
            {
                options.icon = "https://www.iconfinder.com/icons/619539/cancel_close_delete_dismiss_exit_recycle_remove_icon#size=128";
                return new Notification( "Error Message", options );
                break;
            }
            //Warning case
        case "w":
            {
                return new Notification( "Warning Message", options );
                break;
            }
            //Success Case
        default:
            {
                options.icon = "https://cdn0.iconfinder.com/data/icons/round-ui-icons/512/tick_green.png";
                return new Notification( "Success Message", options );
                break;
            }
    }
    return new Notification( message );
}
//Check if notification enabled or not
function notify( message, time, alertfor )
{

    if ( !( "Notification" in window ) )
    {
        return false;
    }
    else if ( Notification.permission === "granted" )
    {

        var notification = notifyit( message, alertfor );
    }


    else if ( Notification.permission !== 'denied' )
    {
        Notification.requestPermission( function ( permission )
        {

            if ( permission === "granted" )
            {
                var notification = new Notification( notify );
            }
        } );
    }
    else
    {
        return false;
    }
    if ( typeof notification != und )
    {
        setTimeout( notification.close.bind( notification ), time );
    }

    // At last, if the user has denied notifications, and you 
    // want to be respectful there is no need to bother them any more.
}
/*Form Alerts  based on different types error(e),warning(w),Success(default)*/
function alerts( to, text, time, alertfor )
{
    if ( notify( text, time, alertfor ) != false )
    {
        return true;
    }
    to.find( '.alert' ).remove();
    switch ( alertfor )
    {
        //Error case
        case "e":
            {
                to.append( '<div class="alert alert-danger"></div>' );
                break;
            }
            //Warning case
        case "w":
            {
                to.append( '<div class="alert alert-warning"></div>' );
                break;
            }
            //Success Case
        default:
            {
                to.append( '<div class="alert alert-success"></div>' );
                break;
            }
    }

    var alert = to.find( '.alert:last' );
    alert.text( text );
    //remove Alerts after timeperiod
    setTimeout( function ()
    {
        alert.remove();
    }, time );
}

//Assign form rows data automatically to each inputs
//listname==data-list name nad name of list getting from table 
//index3==looping i means index value
//index4 = name of rows input
//value4 = value of that input
function assignrows( form, listname, index3 )
{


    var morediv = $( form ).find( '.moreouterdiv[data-list=' + listname + ']' );

    if ( index3 == 0 )
    {
        morediv.html(moredivhtml[listname]);
    }
    else
    {
        morediv.append( moredivhtml[listname] );
    }
    setmorediv( morediv );
    var fieldset = morediv.find('.moreinnerpart').eq(index3);
    fieldset.find(".autolist").each(function () {
        autolistserverdependency($(this));
        getautolistjson($(this));
    });
    morediv.trigger('afterappend');
    return fieldset;
}
function assignrowsvalues( fieldset, index4, value4,index )
{
    //consoleit("From AssignRowvalues " + index4 + " = " + value4);
    //There have only allowed id consideration name not allowed
    var input = fieldset.find( '#' + index4 + ',#' + index4 + index );
    if ( input.length == 0 )
    {
        input = fieldset.find( '[id^=' + index4 + ']' );
    }
    var outer = fieldset.closest( '.moreouterdiv' );
    if ( defined( outer.attr( 'data-hideonly' ) ) )
    {
        if ( defined( outer.attr( 'data-operation' ) ) )
        {
            fieldset.find( '[id^=' + outer.attr( 'data-operation' ) + ']' ).val( 1 );
        }
    }
    
    var tag = input.attr( 'type' );
    switch ( tag )
    {
        //Checkbox
        case "checkbox":
            {
                input.prop( "checked", value4 );
                break;
            }
            //Radio Button
        case "radio":
            {
                input2 = fieldset.find('[name$=' + index4 + '][value=' + value4 + '],[id^=' + index4 + '][value='

+ value4 + ']');
                if (input2.length > 0) {
                    input2.prop("checked", true);
                }
                else {
                    

                }
                input.prop("checked", value4);
                break;
            }
            //Input, Textarea and select
        default:
            {
                input.val(value4);
                if (input.hasClass("autolist")) {
                    input.attr('data-fillvalue',value4);
                }
                if ( input.hasClass( "triggerev" ) )
                {
                    TriggerEvent( input.find( "option:selected" ).val() );
                }
                break;
            }
    }

}


//Assign form data automatically to each inputs
//index==id or name value2==value
function assignvalues( form, index2, value2 )
{
    
    var selectors = '.' + index2 + ',[name=' + index2 + '],#' + index2 + ',div.autolist[data-inputid=' + index2 + ']';

        var input = $( form ).find( selectors );
        if ( input.length == 0 )
        {
            selectors = '[id^=' + index2 + ']';

            input = $( form ).find( selectors );
            if ( input.length > 0 )
            {
                if ( input.closest( '.moreouterdiv' ).length == 0 || value2 == "" || value2 == null )
                {
                    return false;
                }
            }
        }
        if ( value2 == 0 || value2 == null || value2 == "")
        {
            input.trigger('change');
            return false;
        }
        //consoleit("From Assignvalues "+ index2 + " = " + value2 );

        if ( input.length > 0 )
        {
            var tag = input.attr( 'type' );

            switch ( tag )
            {
                //Checkbox
                case "checkbox":
                    {
                        input.prop( "checked", value2 ).trigger( 'change' );
                        break;
                    }
                    //Radio Button
                case "radio":
                    {
                        input2 = $( form ).find( '[name=' + index2 + '][value=' + value2 + '],#' + index2 + '[value=' + value2 + ']' );
                        if ( input2.length > 0 )
                        {
                            input2.prop( "checked", true ).trigger( 'change' );
                        }
                        else
                        {
                            input.prop( "checked", value2 ).trigger( 'change' );

                        }
                        
                        break;
                    }
                case "file":
                    {
                        var fileImageId = input.attr( "data-imageid" );
                        if ( !defined( fileImageId ) )
                        {
                            consoleit( 'Pls define img src id for inpu eg: <input data-imageid="yourimageid"' );
                        }
                        var fileImagerootUrl = input.attr( "data-rooturl" );
                        if ( typeof fileImagerootUrl != 'undefined' )
                        {
                            $( "#" + fileImageId ).attr( "src", fileImagerootUrl + value2 ).show();
                        }
                        input.trigger( 'change' );
                        break;
                    }

                    //Input, Textarea and select
                default:
                    {
                        var tagname = input[0].tagName.toLowerCase();

                        switch ( tagname )
                        {

                            case 'select':
                                {
                                    //debugger;
                                        var text = input.find('option:contains(' + value2 + ')');
                                        if ( text.length > 0 && input.find( "option[value='" + value2 + "']" ).length == 0 && input.find( 'option[value]' ).length > 1 )
                                        {
                                            text.each( function ()
                                            {
                                                if($(this).text()==value2)
                                                {
                                                    input.val( $( this ).attr( 'value' ) ).attr( 'data-fillvalue', $( this ).attr( 'value' ) ).trigger( 'change' );
                                                }
                                            } )
                                            
                                        }
                                        else {
                                            input.val(value2).attr('data-fillvalue', value2).trigger('change');
                                        }
                                    
                                    
                                    break;
                                }
                            case 'div':
                                {

                                    if ( input.hasClass( 'autolist' ) )
                                    {
                                        if ( value2 instanceof Object )
                                        {
                                            var valueobject = input.attr( 'data-valuesobject' );
                                            if ( typeof valueobject == 'undefined' )
                                            {
                                                consoleit( 'Pls add data-valuesobject="objectname" for "autolist" because ' + index2 + ' is an array' );
                                            }
                                            input.find( 'input' ).prop( 'checked', false );
                                            $.each( value2, function ( index3, value3 )
                                            {
                                                input.find( 'input[value=' + value3[valueobject] + ']' ).prop( 'checked', true ).trigger( 'change' );
                                            } )
                                            input.attr( 'data-fillvalue', JSON.stringify( value2 ) );
                                        }
                                        else
                                        {
                                            input.find( 'input' ).prop( 'checked', false );

                                            if ( value2 != "" )
                                            {
                                                if ( value2 != null && value2.match( ',' ) )
                                                {
                                                    var values = value2.split( ',' );
                                                    $.each( values, function ( n, v )
                                                    {
                                                        if ( v != "" )
                                                        {
                                                            input.attr( 'data-fillvalue', v );
                                                            input.find( 'input[value=' + v + ']' ).prop( 'checked', true ).trigger( 'change' );
                                                        }
                                                    } )

                                                }
                                                else
                                                {
                                                    input.attr( 'data-fillvalue', value2 );
                                                    if ( value2 != null && allowselector( value2 ) )
                                                    {
                                                        input.find( 'input[value=' + value2 + ']' ).prop( 'checked', true ).trigger( 'change' );
                                                    }

                                                }
                                            }
                                        }
                                    }
                                    else
                                    {
                                        input.html( value2 ).trigger( 'change' );
                                    }

                                    break;
                                }
                            default:
                                {
                                    if ( value2.length > 4 && value2.split( '/Date(' ).length > 1 )
                                    {

                                        if ( !defined( input.attr( 'data-dateformat' ) ) )
                                        {
                                            consoleit( 'You Can Also allowed to change date format use date-dateformat="dd-mm-yy" for Datepicker', 'w' );
                                            input.attr( 'data-dateformat', $( '#DateFormatforScripts' ).val() );
                                        }
                                        value2 = $.datepicker.formatDate( input.attr( 'data-dateformat' ), new Date( parseInt( value2.replace( '/Date(', '' ).replace( ')/', '' ) ) ) );
                                    }

                                    if ( input.closest( '.moreouterdiv' ).length > 0 && value2 != "" && value2 != null && value2.split( ',' ).length > 1 )
                                    {
                                        var values = value2.split( ',' );
                                        $.each( values, function ( n, v )
                                        {
                                            if ( v != "" )
                                            {
                                                if ( n != 0 )
                                                {
                                                    var moreouter = input.closest( '.moreouterdiv' );
                                                    if ( moreouter.find( selectors ).eq( n ).length == 0 )
                                                    {
                                                        moreouter.find( '.moreplus' ).trigger( 'click' );
                                                    }
                                                    input = moreouter.find( selectors ).eq( n );
                                                }
                                                input.val( v ).trigger( 'blur' );
                                            }
                                        } )


                                    }
                                    else
                                    {
                                        if (typeof value2=="number"||typeof value2=="string") {
                                            input.val(value2).trigger('blur');
                                        }
                                    }


                                }

                                break;

                        }
                    }

            }

        }
}
//reset a form with flag value
function resetform( form )
{

    form.find( 'textarea,input[type=text]:not([readonly]),input[type=hidden]:not([readonly]),input[type=hidden]:not([readonly]),input.hasDatepicker' ).val( "" );
    

    form.find( '[data-fillvalue]' ).removeAttr( 'data-fillvalue' );
    form[0].reset();
    //Flag value 0 defined insertion and 1 defines editing
    form.find( 'input.flag' ).val( "0" );
    form.find( '.passwordrow input[type=password]' ).show();
    form.find( '.passwordrow input[type=password]:eq(1)' ).closest( '.passwordrow' ).show();
    form.find( '.passwordrow  .resetpassword' ).remove();

    /*
    Reset ddls with trigger event
    */
    
    form.find( 'select' ).each( function ()
    {
        var value = $( this ).find( 'option:first' ).attr( 'value' );
        if ( defined(  value) )
        {
            $( this ).val( value );
        }
        else
        {
            $( this ).val("");
        }
    } );
    form.find('select[data-resethtml=true]').html('');
    form.find('input[data-resetvalue=true]').val('');
    form.find( 'select' ).trigger( 'change' );

    form.find( 'input[data-triggerevent]' ).each( function ()
    {
        $( this ).trigger( $( this ).data( 'triggerevent' ) );
    } );

    form.find( 'input[type=checkbox],input[type=radio]' ).prop( "checked", false );
    form.find('input[type=checkbox][data-default],input[type=radio][data-default=true]').prop("checked", true);
    form.find( 'img' ).each( function ()
    {
        var emptyimage = $( this ).attr( 'data-emptysrc' );
        if ( typeof emptyimage == 'undefined' )
        {
            $( this ).attr( "src", '' );
            consoleit( 'You can specify an empty image in your img tage by putting a custom attribute data-emptysrc. eg:data-emptysrc="google.jpg" ', 'w' );
        }
        else
        {
            $( this ).attr( "src", emptyimage );
        }
    } );

    resetaddmores( form );
    form.find('[type=submit]').show();

    form.trigger('resetform');

   
}

//pass an array and and a form element for apply errors ..
//Commonly used for Bind model validations to each fields as error
function fillerrors( form, rows )
{
    $.each( rows, function ( i, v )
    {
        if ( v.id.match( /\[[0-9]\]/ ) )
        {
           
            var newid = v.id.split( /\[[0-9]\]\./ );
            var eq = v.id.split( '[' )[1].split( ']' )[0];
            newid = newid[1];

            var input = form.find( ':visible#' + newid + ',:visible.' + newid + ',:visible[name=' + newid + '],:visible[name$=' + newid + ']' ).eq( eq );
            
        }
        else
        {
            var input = form.find( ':visible#' + v.id + ',:visible.' + v.id + ',:visible[name=' + v.id + ']' );
        }
        input.trigger('blur');
        if (input.length == 0) {
            var selectors = ':visible[id^=' + v.id + '],:visible[name^=' + v.id + ']';

            input = form.find(selectors);

            if (input.length > 0) {
                if (input.closest('.moreouterdiv').length == 0 || value2 == "" || value2 == null || value2.split(',').length == 1) {
                    return false;
                }
                else
                {
                    input.trigger('blur');
                }
            }
        }
        if ( v.message.length > 0 )
        {
            classfill( input.closest( 'div' ), "has-error", 4, v.message.join( '</br>' ) );
        }
    } )
}
function setmorediv( outer )
{
    var limit = parseInt( outer.data( 'rowmaxlimit' ) );
    var lowerlimit = parseInt( outer.data( 'rowminlimit' ) );
    var inners = outer.find( '.moreinnerpart:visible' );
    var lastinner = outer.find( '.moreinnerpart:visible:last' );
    var currentlength = inners.length;
    outer.find( '.moreplus:visible' ).hide();
    lastinner.find( '.moreplus' ).show();
    outer.find( '.moredelete' ).show();
    //outer.find('.moredelete:last').hide();

    if ( currentlength == limit )
    {
        outer.find( '.moreplus:visible' ).hide();
    }
    if ( currentlength == lowerlimit )
    {
        for ( i = 1; i <= lowerlimit; i++ )
        {
            outer.find( '.moredelete:visible' ).eq( i - 1 ).hide();
        }

    }
    outer.find( '.moreinnerpart' ).each( function ( index )
    {
       
        var innner = $(this);
        $( this ).find( 'input[data-imageid]' ).each( function ()
        {
            var originalid = $(this).attr('data-imageid').replace(new RegExp("[0-9]", "g"), '');
            innner.find('img[id=' + originalid + ']').attr('id', originalid + index);
            $(this).attr('data-imageid', originalid + index);


        })
        $(this).find('input[name][id],select[name][id],textarea[name][id]').each(function ()
        {
            var originalid = $( this ).attr( 'id' ).replace( new RegExp( "[0-9]" ,"g"), '' );

           // $(this).attr('name', $(this).attr('name').replace(new RegExp(/\[n\]/g), "[" + index + "]"));

            $(this).attr('name', $(this).attr('name').replace(new RegExp(/\[n\]/g), "[" + index + "]"));
            $( this ).attr( 'name', $( this ).attr( 'name' ).replace( new RegExp( "\\[[0-9]+\]" ), "[" + index + "]" ) );
            //$( this ).attr( 'name', $( this ).attr( 'name' ).replace( new RegExp( /[0-9]/g ), index ) );

            
            switch($(this).attr('type'))
            {
                case 'checkbox':
                    {

                    }
                case 'radio':
                    {
                        $(this).attr('id', originalid + index);
                        innner.find( 'label[for^=' + originalid + ']' ).attr( 'for', originalid + index );
                        break;
                    }
                default:
                    {
                        $(this).attr('id', originalid + index);
                    }
            }
            
            
        } );
    } )

    

}
function resetaddmores( objectid )
{
    objectid.find( '.moreouterdiv' ).each( function ( index )
    {
        if ( typeof $( this ).attr( 'data-list' ) != 'undefined' )
        {
            $( this ).html( moredivhtml[$( this ).data( 'list' )] );
            setmorediv( $( this ) );
        }
    } );

}

function autolistserverdependency( th )
{
    //eg:#iatabranch,#agncyid
    $(th.data( 'serverdepend' ) ).change( function ()
    {

        if ( submitmode == false )
        {

            getautolistjson( th );
        }
    } );

}
function filldropdown( mylist, rows, tagname, uniquekey, len, taghtml )
{
    mylist.html( '' );
    if ( defined( uniquekey ))
    {
        savedropdowns[uniquekey].rows = rows;
        if ( savedropdowns[uniquekey].alsofill.length > 0 )
        {
            $.each( savedropdowns[uniquekey].alsofill, function ( il, vl )
            {
                getautolistjson( vl );
            } );
            savedropdowns[uniquekey].alsofill = [];
        }
        setcache( 'saveddropdowns', JSON.stringify( savedropdowns ) );
    }
    if ( rows != null && rows != "" )
    {
        if ( tagname == 'select' )
        {
            if ( typeof mylist.attr( 'placeholder' ) != und )
            {
                mylist.html( $( "<option>" ).val( "" ).html( mylist.attr( 'placeholder' ) ) );
            }
            if (defined( mylist.attr('data-select'))) {
                if (defined(mylist.attr('data-selectlabel'))) {
                    mylist.html($("<option>").val(mylist.attr('data-select')).html(mylist.attr('data-selectlabel')));
                }
                else {
                    mylist.html($("<option>").val(mylist.attr('data-select')).html("Select"));
                }
            }
            if ( rows.length > 0 )
            {
                if ( typeof mylist.attr( 'data-all' ) != und )
                {
                    mylist.html( $( "<option>" ).val( mylist.attr( 'data-all' ) ).html( "All" ) );
                }
            }
            if ( typeof mylist.attr( 'data-blankall' ) != und )
            {
                mylist.html( $( "<option>" ).val( mylist.attr( 'data-blankall' ) ).html( "All" ) );
            }
            if ( rows.length > 0 )
            {
                $.each( rows, function ( i )
                {
                    //eg:mylist.data( 'value' )=c# variable name of dropdown value eg:countrylist -- countrycode and text is countryname
                    mylist.append( $( "<option>" ).val( rows[i][mylist.data( 'value' )] ).html( rows[i][mylist.data( 'text' )] ) );
                } );
            }

        }
        else
        {
            
            $.each( rows, function ( i )
            {
                mylist.append( taghtml );
                var input = mylist.find( 'input:last' );
                var label = mylist.find( 'label:last' );
                label.attr( 'for', input.attr( 'id' ) + i );
                if ( mylist.find( '.customlabel:last' ).length > 0 )
                {
                    label = mylist.find( '.customlabel:last' );
                }
                input.val( rows[i][mylist.data( 'value' )] );
                label.html( rows[i][mylist.data( 'text' )] );
                input.attr( 'id', input.attr( 'id' ) + i );
            } );
        }
    }
    else
    {
        mylist.html( $( "<option>" ).val( "" ).html( 'No Options Found' ) ).trigger( 'change' );
    }

    if ( typeof mylist.attr( 'data-fillvalue' ) != und && mylist.attr( 'data-fillvalue' ) != '' )
    {

        if ( tagname == 'div' )
        {
            var json = $.parseJSON( mylist.attr( 'data-fillvalue' ) );
            var valueobject = mylist.attr( 'data-valuesobject' );
            $.each( json, function ( index3, value3 )
            {
                mylist.find( 'input[value=' + value3[valueobject] + ']' ).prop( 'checked', true ).trigger( 'change' );
            } );

        }
        else
        {
            var text = mylist.find( 'option:contains(' + mylist.attr( 'data-fillvalue' ) + ')' );
            if ( text.length > 0 && mylist.find( 'option[value=' + mylist.attr( 'data-fillvalue' ) + ']' ).length == 0 && mylist.find( 'option[value]' ).length > 1 )
            {
                text.each( function ()
                {
                    if ( $( this ).text() == mylist.attr( 'data-fillvalue' ) )
                    {
                        mylist.val( $( this ).attr( 'value' ) ).trigger( 'change' );
                    }
                } )

            }
            else
            {
                mylist.val( mylist.attr( 'data-fillvalue' ) );
                mylist.find( 'input' ).prop( 'checked', false );
                mylist.find( 'input[value=' + mylist.attr( 'data-fillvalue' ) + ']' ).prop( 'checked', true ).trigger( 'change' );
            }

            //    mylist.removeAttr('data-fillvalue');
        }
    }
    if (mylist.closest('.selectric-autolist').length > 0)
    {
        mylist.selectric();
    }
    if (mylist.find('option:first').text() == 'All' && mylist.find('option:first').attr('value') == mylist.val())
    {
        mylist.trigger('change',true);
    }
    else
    {
        mylist.trigger('change');
    }
    mylist.trigger( 'afterautolist' );
   
}
function getautolistjson( th )
{
    var mylist = th;
    th.attr('data-autolistinitialized' , true);
    if (!defined( mylist.attr( 'data-json' ) ) )
    {
        consoleit( 'Some where added "autolist" class but not added json link  pls add it or remove class name autolist it is reserved class name for autolist dropdown', 'e' );
    }
    if ( !defined( mylist.attr( 'data-value' )) || !defined( mylist.attr( 'data-text' )) )
    {
        consoleit( 'Pls Add the value variable and text variable for all  "autolist" named classes eg:data-value="CompanyId" data-text="CompanyName" ', 'e' );
    }
    var taghtml = '';
    var tagname = mylist[0].tagName.toLowerCase();
    switch ( tagname )
    {
        case 'select':
            {
                break;
            }
        case 'div':
            {
                taghtml = autolistdivhtml[mylist.attr( 'id' )];
                break;
            }
        default:
            {
                consoleit( 'This tag Not supported autolist only choose select or div" ', 'e' );
            }
    }
    var autolistdependfill = true;
    var postdata = {};
    $( mylist.data( 'serverdepend' ) ).each( function ()
    {
        //if select name is iatabranchid we need to send it in another name eg:Branchid use it
        if (defined($(this).attr('data-customname'))) {
            postdata[$(this).attr('data-customname')] = $(this).val();
        }
        else
        {
            postdata[$(this).attr('name')] = $(this).val();
        }
        if ( !defined( mylist.attr( 'data-dependrequired' ) ) )
        {
           

            if ( $( this ).val() == '' || $( this ).val() == null )
            {
                autolistdependfill = false;
                if ( tagname == 'select' )
                {
                    mylist.html( '' ).trigger( 'change' );
                    if (defined(mylist.attr( 'data-blankall' )) )
                    {
                        mylist.html( $( "<option>" ).val( mylist.attr( 'data-blankall' ) ).html( "All" ) );
                    }
                    else
                        if ( defined( mylist.attr( 'placeholder' )))
                        {
                            mylist.html( $( "<option>" ).val( "" ).html( mylist.attr( 'placeholder' ) ) );
                        }
                        else
                        {
                            mylist.html( $( "<option>" ).val( "" ).html( 'No Options Found' ) ).trigger( 'change' );
                        }

                }
            }
        }
    } );
    if ( autolistdependfill == false )
    {

        consoleit( 'Kindly fill all server dependent variables of auto list first" ', 'w' );
        return false;
    }
    //mylist.html( '' );
    var jsonlink = th.attr( 'data-json' );
    var alreadyrequested = false;
    var uniquekey = jsonlink + JSON.stringify(postdata);
    //savedropdowns = keeping dropdowns json with postdata uniquekey
    var list=savedropdowns[uniquekey];
    if ( defined(list )&& (!defined(th.attr('data-bindnew'))))
    {

        if (defined(list.rows))
                {
                    filldropdown( mylist, list.rows, tagname );
                }
                else
                {
                    savedropdowns[uniquekey].alsofill.push( mylist );
                }
                if ( defined( savedropdownsnewrequest[uniquekey] ) )
                {
                    alreadyrequested = true;
               }
     
    }
    if ( alreadyrequested == true )
    {
        //Be Later automatically fill use alsofill used in above lines
         return false;
    }
    var len = 0;
    if ( defined( savedropdowns[uniquekey] ) )
    {
        len = savedropdowns[uniquekey].length;
    }
    else
    {
        savedropdowns[uniquekey] = [];
    }
    savedropdowns[uniquekey] = {};
    savedropdowns[uniquekey].postdata = postdata;
    savedropdowns[uniquekey].alsofill = [];
    savedropdownsnewrequest[uniquekey] = true;
    //eg:postdata = iatabranchid=2;
    $.post(jsonlink, postdata, function (data)
    {
        if ( defined( savedropdowns[uniquekey].rows ) )
        {
            setTimeout( function () { filldropdown( mylist, data.Rows, tagname, uniquekey, len, taghtml ) }, 10000 );
        }else
        {
            filldropdown( mylist, data.Rows, tagname, uniquekey, len, taghtml );
        }
        // mylist.trigger( 'change' );
    } );
}

$( document ).ready( function ()
{
    /*
    Automatically firstly keeping all rows fresh html data for appending when click plus button*/
    $( '.moreouterdiv' ).each( function ()
    {
        if ( typeof $( this ).attr( 'data-list' ) != 'undefined' )
        {
            moredivhtml[$(this).data('list')] = $(this).html().replace(/\[0\]/g, '[n]');
            setmorediv( $( this ) );
        }
    } );
    /*Function for add more div */
    $( 'body' ).on( 'click', '.moreplus', function ()
    {
        var outer = $( this ).closest( '.moreouterdiv' );
        outer.append( moredivhtml[outer.data( 'list' )]);
        setmorediv(outer);
        outer.find( '.moreinnerpart:visible:last' ).find(".autolist").each(function () {
            autolistserverdependency($(this));
            getautolistjson($(this));
        });
        outer.trigger('afterappend');
    } )
    $( 'body' ).on( 'click', '.moredelete', function ()
    {
        var outer = $( this ).closest( '.moreouterdiv' );
        var inner=$( this ).closest( '.moreinnerpart' );
        if ( defined( outer.attr( 'data-hideonly' ) ) )
        {
            inner.hide();
            if ( defined( outer.attr( 'data-operation' ) ) )
            {
                var val = inner.find( '[id^=' + outer.attr( 'data-operation' ) + ']' );
                if ( val.val() == 1 )
                {
                    val.val( 2 );
                }
                else
                {
                    inner.remove();
                }
            }
        }
        else
        {
            inner.remove();
        }
        
        setmorediv( outer );
        outer.trigger('afterdelete');
    } )


    /*Table Bind Manager edit function 
    Required Attributes for tables are
    data-editaction it defines url to get edit data based on id
    data-editflag it requires 1 or 0 =>1 for edit and 0 for insert
    */
    //$('#tablebind').bindmanager();
   
    $( 'body' ).on( 'click', "." + editclass+",.pageloadedit", function ( e )
    {
        e.preventDefault();
        editmode = true;
        var mydata = {};
        var multitaskvar = "";
        var bindrows = $( this ).closest( '.' + bindtablediv );
        var id = $( this ).data( 'id' );
        if ( typeof $( this ).attr( 'data-name' ) != und )
        {
            id = $( this ).data( 'name' );
        }
        var parameters = "";
        if (id == 'json') {
            var array = $.parseJSON($(this).data('json').replace(/'/g, '"'));
            $.each(array, function (n, vl) {
                mydata[vl.id] = vl.value;
                if (defined(vl.id)) {
                    if (n != 0) {
                        parameters += "&";
                    }
                    parameters += vl.id + '=' + vl.value;
                }
            });
        }
        else {
            mydata[id] = $(this).data('value');
            parameters += id + '=' + $(this).data('value');
        }
        var list = defined(bindrows.data('list')) ? bindrows.data('list') : "Rows";
        var form = bindrows.data('form');
        if (!defined(form) && (defined($(this).attr('id'))))
        {
            form = "#"+$(this).attr('id');
        }
        if (defined(form) && $(form).length > 0) {
            resetform($(form));
            $(form).find('.passwordrow input[type=password]').hide();
            $(form).find('.passwordrow input[type=password]:first').closest('div').append('<span class="resetpassword">RestPassword</span>');
            $(form).find('.passwordrow input[type=password]').hide();
            $(form).find('.passwordrow input[type=password]:eq(1)').closest('.passwordrow').hide();
            $(form).find('.flag').val(bindrows.data('editflag'));
        }   
        if (defined($(this).attr('href'))) {

            if (defined($(this).attr('target'))) {
                window.open($(this).attr('href') + '?' + parameters, $(this).attr('target'));
            }
            else {
                window.location.href = $(this).attr('href') + '?' + parameters;
            }
        }
        startloading();
        $(this).trigger('beforeedit', mydata);
        var editaction = $(this).closest('.' + bindtablediv).data('editaction');
        if (!defined(editaction))
        {
            editaction = $(this).data('editaction');
        }
        $.post(editaction, mydata, function (data)
        {
            stoploading();
            $.each( data[list], function ( index, value )
            {
                if ( index == "PriceRangeLst" )
                {
                //    debugger;
                }
                if ( value instanceof Object )
                {

                    $.each( value, function ( index2, value2 )
                    {
                        if ( typeof index2 == "number" && value2 instanceof Object )
                        {
                            
                            var fieldset = assignrows( form, index, index2 );

                            if ( $( 'div.autolist[data-inputid=' + index + ']' ).length > 0 )
                            {
                                assignvalues( form, index, value );
                            }
                            $.each( value2, function ( index4, value4 )
                            {
                                if ( value4 instanceof Object )
                                {
                                }
                                else
                                {
                                    assignrowsvalues( fieldset, index4, value4, index2 );
                                }
                            } );
                        }
                       else
                        if ( value2 instanceof Object )
                        {
                            $.each(value2, function (index3, value3)
                            {
                               
                                    assignvalues( form, index3, value3 );
                               
                            } );

                        }
                        else
                        {
                            if ( value.length == 1 )
                            {
                                assignvalues( form, index, value2 );
                            }
                            assignvalues( form, index2, value2 );
                        }
                    } );
                }
                else
                {

                    assignvalues( form, index, value );
                }
            } );
           // $( form ).trigger( 'select', data );
            editmode = false;
            $(form).trigger('select', data);
            $(form).trigger('afteredit', data);
            
        } );

        /*Put focus on first element*/
        $( 'form:not(.filter) :input:visible:enabled:first' ).focus();
        $( form + ' [type="submit"]' ).show();
        $( form + ' [type="reset"]' ).show();
    } );
    /*Table Bind Manager edit function 
    Required Attributes for tables are
    data-deleteaction it defines url to get edit data based on id
    */
    /*resetpassword*/
   
    $( 'body' ).on( 'click', '.passwordrow .resetpassword', function ()
    {
        $( this ).closest( 'form' ).find( '.passwordrow input[type=password]' ).val( '' ).show();
        $( this ).closest( 'form' ).find( '.passwordrow input[type=password]:eq(1)' ).closest( '.passwordrow' ).show();
        $( this ).closest( 'form' ).find( '.passwordrow  .resetpassword' ).remove();
    } )

    $( 'body' ).on( 'click', "." + deleteclass, function ( e )
    {
        var mydata = {};
        var bindrows = $( this ).closest( '.' + bindtablediv );
        var id = $( this ).data( 'id' );
        if ( typeof $( this ).attr( 'data-name' ) != und )
        {
            id = $( this ).data( 'name' );
        }

        mydata[id] = $( this ).data( 'value' );
        var list = bindrows.data( 'list' );
        var form = typeof bindrows.attr( 'data-form' ) != und ? bindrows.attr( 'data-form' ) : "";
        var alert = $( form ).find( '.alertbox' );
        if ( bindrows.attr( 'data-form' ) ) { consoleit( 'Bind Rows Data-form attribute not defined', 'e' ); }//Move to bind manager
        var r = confirm( "Do You Want to Delete It?" );
        if ( r == true )
        {

            $.post( $( this ).closest( '.' + bindtablediv ).data( 'deleteaction' ), mydata, function ( data )
            {
                managedata( data, alert, 3000 );
                if ( data.Error == false )
                {
                    if ( form != '' )
                    {
                        $( '.' + bindtablediv + '[data-form=' + form + ']' ).each( function ()
                        {
                            $( this ).bindmanager();
                        } );
                    }
                    else
                    {
                        bindrows.bindmanager();
                    }
                        resetform( $( form ) );
                        $( form ).trigger( 'change' );
                   
                }

            } );
        }
    } );
    


    /*Table Bind Manager view function 
   Required Attributes for tables are
   data-editaction it defines url to get view data based on id
   data-editflag it requires 1 or 0 =>1 for view and 0 for insert
   */
    //$('#tablebind').bindmanager();
    $('body').on('click', "." + viewclass + ",.pageloadview", function (e)
    {
        var bindrows = $( this ).closest( '.' + bindtablediv );
        var form = bindrows.data( 'form' );
        if ( $( form ).hasClass( "customview" ) )
        {
            var id = $( this ).data( 'id' );
            if ( typeof $( this ).attr( 'data-name' ) != und )
            {
                id = $( this ).data( 'name' );
            }
            var entityId = $( this ).data( 'value' );
            ShowCustomView( entityId );
        }
        else
        {
            //var form = bindrows.data('form');
            var mydata = {};
            var multitaskvar = "";
            var id = $(this).data('id');
            if (typeof $(this).attr('data-name') != und) {
                id = $(this).data('name');
            }
            var parameters = "";
            if (id == 'json') {
                var array = $.parseJSON($(this).data('json').replace(/'/g, '"'));
                $.each(array, function (n, vl) {
                    mydata[vl.id] = vl.value;
                    if (defined(vl.id)) {
                        if (n != 0) {
                            parameters += "&";
                        }
                        parameters += vl.id + '=' + vl.value;
                    }
                });
            }
            else {
                mydata[id] = $(this).data('value');
                parameters += id + '=' + $(this).data('value');
            }
            var list = defined(bindrows.data('list')) ? bindrows.data('list') : "Rows";
            var form = bindrows.data('form');
            if (!defined(form) && (defined($(this).attr('id')))) {
                form = "#" + $(this).attr('id');
            }
            if (defined(form) && $(form).length > 0) {
                resetform($(form));
                $(form).find('.passwordrow input[type=password]').hide();
                $(form).find('.passwordrow input[type=password]:first').closest('div').append('<span class="resetpassword">RestPassword</span>');
                $(form).find('.passwordrow input[type=password]').hide();
                $(form).find('.passwordrow input[type=password]:eq(1)').closest('.passwordrow').hide();
                $(form).find('.flag').val(bindrows.data('editflag'));
            }
            if (defined($(this).attr('href'))) {
                parameters +=  '&view=true' ;
                if (defined($(this).attr('target'))) {
                    window.open($(this).attr('href') + '?' + parameters, $(this).attr('target'));
                }
                else {
                    window.location.href = $(this).attr('href') + '?' + parameters;
                    return false;
                }
            }
            startloading();
            $(this).trigger('beforeedit', mydata);
            var editaction = $(this).closest('.' + bindtablediv).data('editaction');
            if (!defined(editaction)) {
                editaction = $(this).data('editaction');
            }
            $.post(editaction, mydata, function (data)
            {
                stoploading();
                $.each( data[list], function ( index, value )
                {
                    if ( index == "PriceRangeLst" )
                    {
                        //    debugger;
                    }
                    if ( value instanceof Object )
                    {

                        $.each( value, function ( index2, value2 )
                        {
                            if ( typeof index2 == "number" && value2 instanceof Object )
                            {

                                var fieldset = assignrows( form, index, index2 );

                                if ( $( 'div.autolist[data-inputid=' + index + ']' ).length > 0 )
                                {
                                    assignvalues( form, index, value );
                                }
                                $.each( value2, function ( index4, value4 )
                                {
                                    if ( value4 instanceof Object )
                                    {
                                    }
                                    else
                                    {
                                        assignrowsvalues( fieldset, index4, value4, index2 );
                                    }
                                } );
                            }
                            else
                                if ( value2 instanceof Object )
                                {
                                    $.each( value2, function ( index3, value3 )
                                    {

                                        assignvalues( form, index3, value3 );

                                    } );

                                }
                                else
                                {
                                    if ( value.length == 1 )
                                    {
                                        assignvalues( form, index, value2 );
                                    }
                                    assignvalues( form, index2, value2 );
                                }
                        } );
                    }
                    else
                    {

                        assignvalues( form, index, value );
                    }
                } );
                $( form ).trigger( 'view', data );
                
                $( form ).trigger( 'view', data );
            } );
            /*Put focus on first element*/
            //$('form:not(.filter) :input:visible:enabled:first').focus()
            $(form + ' [type="submit"]').hide();
            if (!defined($(form).attr('data-showresetbutton'))) {
                $(form + ' [type="reset"]').show();
            }
        }
    } );

    /* reset form*/

    $( 'body' ).on( 'reset', 'form.common', function ( e )
    {
        e.preventDefault();
        resetform( $( this ) );
        resetformvalidation( $( this ) );
    } );

    $('form.common').each(function () {
        var form = $(this);
        var view = false;
        if (defined($(this).attr('data-editaction'))) {
            url = window.location.href;
            var postparameters = {}
            var parameters = url.split("?")[1]
            if (defined(parameters)) {
                var splitparam = parameters.split("&");
                var name = ""
                var value = "";

                $.each(splitparam, function (i, v) {
                    var variable = v.split("=")

                    postparameters[variable[0]] = variable[1];
                    if (variable[0] == "view" && variable[1].toString() == "true") {
                        form.find('button[type=reset],input[type=reset],button[type=submit],input[type=submit]').hide();
                        view = true;
                    }
                    else {
                        name = variable[0];
                        value = variable[1];
                    }
                })
                if (splitparam.length > 1 && (splitparam.length == 2 && view == false)) {

                    $(this).attr('data-id') = "json";
                    $(this).attr('data-json') = JSON.stringify(postparameters);

                }
                else {
                    $(this).attr('data-id', name);
                    $(this).attr('data-value', value);
                }
            }
            if (view == false) {
                $(this).addClass('pageloadedit');
                $(this).trigger('click');
                $(this).removeClass('pageloadedit');
            }
            else {
                $(this).addClass('pageloadview');
                $(this).trigger('click');
                $(this).removeClass('pageloadview');
            }
        }
    })



    $('.' + editclass).trigger('click');
    $('.' + viewclass).trigger('click');
    /*
    Add Class Name common if require this auto form submission
    Required action method and action path
    */
    var arrayClean = function ( thisArray, thisName )
    {
       
        $.each( thisArray, function ( index, item )
        {
            if ( item.name == thisName )
            {
                delete thisArray[index];
            }
        } );
        return thisArray;
    }
    $( 'body' ).on( 'click', '.' + tabletoexcelclass, function ( e )
    {
        var rowdiv = $( this ).closest( '.' + bindtablediv )
        if ( defined( rowdiv.attr( 'data-searchform' ) ) )
        {
            e.preventDefault();
            var href = $( rowdiv.attr( 'data-searchform' ) ).attr( 'action' );
            $( rowdiv.attr( 'data-searchform' ) ).attr( 'action', $( this ).attr( 'href' ) );
            $( rowdiv.attr( 'data-searchform' ) ).find( 'input.hasDatepicker[name],input[data-dateformat]' ).each( function ()
            {
                if ( defined( $( this ).attr( 'name' ) ) && $( this ).val() != '' )
                {
                    var dateformat = "";
                    if ( defined( $( this ).attr( 'data-dateformat' ) ) )
                    {
                        dateformat = $( this ).attr( 'data-dateformat' );
                    }
                    else
                        if ( $( this ).hasClass( 'hasDatepicker' ) )
                        {
                            dateformat = $( this ).datepicker( 'option', 'dateFormat' );
                        }
                        else if ( defined( DateFormatforScripts ) )
                        {
                            dateformat = DateFormatforScripts;

                        }
                    if ( dateformat != '' )
                    {
                        $( this ).attr( 'oldvalue', $( this ).val() );
                            $( this ).val($.datepicker.formatDate( "mm/dd/yy", $.datepicker.parseDate( dateformat, $( this ).val() ) ));
                        
                    }

                }
            } )

            $( rowdiv.attr( 'data-searchform' ) ).submit();
            $( 'input[oldvalue]' ).each( function ()
            {
                $( this ).val( $( this ).attr( 'oldvalue' ) );
                $( this ).removeAttr('oldvalue' ) ;
            } )
            

        }
    } )
    $( 'body' ).on( 'click', '.' + tabletoprintclass, function ( e )
    {
        e.preventDefault();
        var rowdiv = $( this ).closest( '.' + bindtablediv );
        if(defined(rowdiv.closest('div').attr('id')))
        {
            rowdiv.find( '.' + tablecustomrow ).hide();
            
            rowdiv.closest( 'div' ).find( '.' + tablenavbar ).hide();
            rowdiv.find( '.tbody,tbody' ).find( 'tr:visible,.tr:visible' ).addClass( 'printingshow' );
            rowdiv.find( '.tbody,tbody' ).find( 'tr,.tr' ).show();
            var printContent = document.getElementById( rowdiv.closest( 'div' ).attr( 'id' ) );
            var windowUrl = 'about:blank';
            var uniqueName = new Date();
            var windowName = 'Print' + uniqueName.getTime();
            var printWindow = window.open( windowUrl, windowName, 'left=0,top=0,width=0,height=0' );
            printWindow.document.write( printContent.innerHTML );
            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
            rowdiv.find( '.' + tablecustomrow ).show();
            rowdiv.closest( 'div' ).find( '.' + tablenavbar ).show();
            rowdiv.find( '.tbody,tbody' ).find( 'tr,.tr' ).hide();
            rowdiv.find( '.tbody,tbody' ).find( '.printingshow' ).show();
        }
        else
        {
            consoleit( 'Please Define id for bindmanager tables closest div it require for print function','e','Print Not Working' );
        }
    })
    $( 'body' ).on( 'submit', 'form.common', function ( e )
    {

        submitmode = true;
        
        var id = $( this ).attr( 'id' );
        var form = $( this );
        form.trigger('beforesave');
        
            // Box for Where the alert append
            var alert = form.find( '.alertbox' );
            e.preventDefault();
            if ( submitform( form ) == false )
            {
                return false;
            }
            startloading();
            switch ( $( this ).attr( 'method' ).toLowerCase() )
            {
                case 'post':
                    {
                        if ( typeof form.attr( 'enctype' ) != 'undefined' )
                        {
                            var formData = new FormData( form[0] );
                            $.ajaxSetup( {
                                processData: false,
                                contentType: false,
                                async: false,
                                cache: false
                            } );
                            form.find( 'select[data-sendtext]' ).each( function ()
                            {
                                formData.append( $( this ).attr( 'name' ) + "text", $( this ).find( 'option[value="' + $( this ).val() + '"]' ).text() );
                            } )


                        }
                        else
                        {
                            var formData = form.serializeArray();
                            form.find( 'select[data-sendtext]' ).each( function ()
                            {
                                //eg: push same as formData['variablename']=value;
                                formData.push( { name: $( this ).attr( 'name' ) + "text", value: $( this ).find( 'option[value="' + $( this ).val() + '"]' ).text() } );
                            } )
                        }
                        form.find('input.hasDatepicker[name],input[data-dateformat]').each(function () {
                            if (defined($(this).attr('name')) && $(this).val() != '') {
                                var dateformat = "";
                                if (defined($(this).attr('data-dateformat'))) {
                                    dateformat = $(this).attr('data-dateformat');
                                }
                                else
                                    if ($(this).hasClass('hasDatepicker')) {
                                        dateformat = $(this).datepicker('option', 'dateFormat');
                                    }
                                    else if (defined(DateFormatforScripts)) {
                                        dateformat = DateFormatforScripts;

                                    }
                                if (dateformat != '') {
                                    if (typeof form.attr('enctype') != 'undefined') {
                                        formData.set($(this).attr('name'), $.datepicker.formatDate("mm/dd/yy", $.datepicker.parseDate(dateformat, $(this).val())));

                                    }
                                    else {
                                        var indexarray = formData.map(function (e) { return e.name; }).indexOf($(this).attr('name'));
                                        formData[indexarray]['name'] = $(this).attr('name');
                                        formData[indexarray]['value'] = $.datepicker.formatDate("mm/dd/yy", $.datepicker.parseDate(dateformat, $(this).val()));
                                    }
                                }
                            }
                        })
                        $.post( $( this ).attr( 'action' ), formData, function ( data )
                        {
                            if ( typeof form.attr( 'enctype' ) != 'undefined' )
                            {
                                $.ajaxSetup( {
                                    processData: true,
                                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                                    async: true,
                                    cache: true
                                } );
                            }
                            managedata( data, alert, 10000 );
                            if ( data.Error == false )
                            {
                                //eg:$('.bindrows[data-form=#myform]')
                                $( '.' + bindtablediv + '[data-form=#' + id + ']' ).each( function ()
                                {
                                    $( this ).bindmanager();
                                } );
                                submitmode = false;

                                if (!defined(form.attr('data-disablereset'))||!defined(form.attr('data-disableresetonsave'))) {
                                    resetform(form);
                                }

                                form.trigger( 'change', data );
                                form.trigger( 'aftersave', data );
                            }
                            else
                            {
                                fillerrors( form, data.Rows );
                            }
                            submitmode = false;
                            stoploading();
                        } );
                        break;
                    }
                case 'get':
                    {
                        $.get( $( this ).attr( 'action' ), $( this ).serializeArray(), function ( data )
                        {
                            submitmode = false;
                            //bindrows(rowdiv);
                        } );
                        break;
                    }
            }
        
    });
    
    $( "div.autolist" ).each( function ()
    {
        if ( typeof $( this ).attr( 'id' ) == und )
        {
            consoleit( 'You Must Define an ID For class="autolist" named Div', 'e' )
        }
        if ( typeof $( this ).find( 'input:first' ).attr( 'id' ) == 'undefined' )
        {
            consoleit( 'You Must Define an ID For class="autolist" named Div"s inside added input element', 'e' )
        }
        $( this ).attr( 'data-inputid', $( this ).find( 'input:first' ).attr( 'id' ) );
        autolistdivhtml[$( this ).attr( 'id' )] = $( this ).html();
        $( this ).html( '' );
    } );
    var temdata = getcache( 'saveddropdowns' );
    if ( temdata != false )
    {
        savedropdowns = $.parseJSON( temdata );
    }

    $( ".autolist" ).each( function ()
    {
        autolistserverdependency( $( this ) );
        getautolistjson( $( this ) );
    } );

    $( "body" ).on( 'change', '.autolist', function ( e )
    {

        if (defined(e.originalEvent))
        {
            $( this ).closest( 'form' ).find( '.autolist' ).removeAttr( 'data-fillvalue' );
        }
    } );

    $( "select[multiple]" ).each( function ()
    {
        $( this ).closest( 'div' ).addClass( 'multiselect' );
    } );


    consoleit("If Your Checkbox Require any integers or string value pls add Class Name 'disabletruefalse' Otherwise it only return true or false value ", "w")
    //Conditions for all checkboxes set true and false
    $( 'body' ).on( 'click', 'input[type=checkbox]', function ()
    {
        if ($(this).hasClass('operatedby') || $(this).hasClass('operatedbyairport') || $(this).hasClass('disabletruefalse')) {
            return true;
        }
        if (defined($(this).attr('value')) && ($(this).attr('value').toString() == 'true' || $(this).attr('value').toString() == 'false')) {
            if ($(this).prop('checked') == true) {
                //$(this).prop('checked', false);   
                $(this).closest('div').find("input[name='" + $(this).attr('name') + "']").val(true);
            }
            else {
                //$(this).prop('checked', false);
                $(this).closest('div').find("input[name='" + $(this).attr('name') + "']").val(false);
            }
        }
    } )
    //TriggerEvent('');
    $( 'body' ).on( 'click', '.' + bindmanagerdiv + ' .' + tablenavbar + ' li a', function ( e )
    {
        e.preventDefault()
    })
    $( 'body' ).on( 'click', '.' + bindmanagerdiv + ' .' + tablenavbar + ' li', function ( e )
    {

        e.preventDefault();
        var cl = $( this ).closest( '.' + bindmanagerdiv );

      
        
        var currPage = parseInt( $( this ).attr( 'rel' ) ) - 1;

        if ( (currPage+2) == cl.find( '.pagination li' ).length || currPage == -1 )
        {
            if ( currPage == -1 )
            {
                var cl = $( this ).closest( '.' + bindmanagerdiv );
                var curr = parseInt( cl.find( '.pagination li:not(.prevlink):not(.active) a:visible:first' ).closest( 'li' ).attr( 'rel' ) );
                makepaginationresponsive( cl, parseInt( curr ),"left" );
            }
            else
            {
                var cl = $( this ).closest( '.' + bindmanagerdiv );
                var curr =  parseInt( cl.find( '.pagination li:not(.nextlink):not(.active) a:visible:last' ).closest( 'li' ).attr( 'rel' ) ) ;
                makepaginationresponsive( cl, parseInt( curr ), "right" );
            }
           
        }
        else
        {
            cl.find( '.' + tablenavbar + ' li' ).removeClass( 'active' );
            $( this ).addClass( 'active' );
            var rowsShown = $( this ).closest( '.' + tablenavbar ).data( 'perpage' );
            var startItem = ( currPage * rowsShown ) + 1;
            var endItem = ( startItem + rowsShown );
            var id = cl.find( 'table' ).attr( 'id' );
            if ( cl.find( '#' + id + ' tbody tr[data-trindex=' + startItem + ']' ).length == 0 )
            {
                paging = true;
                pageno = currPage;
                $( '#' + id ).bindmanager();
            }
            cl.find( '#' + id + ' tbody tr.showit' ).css( 'opacity', '0.0' ).hide()
            .filter( function ( index )
            {
                return $( this ).attr( "data-trindex" ) >= startItem && $( this ).attr( "data-trindex" ) < endItem;
            } )
            .css( 'display', 'table-row' ).animate( { opacity: 1 }, 300 );
            makepaginationresponsive( cl, parseInt( currPage ) + 1 );
        }
        cl.css( 'min-height', cl.height() );
    } );
    $( window ).resize(function() {
        $( '.' + bindmanagerdiv ).each( function ()
        {
            makepaginationresponsive( $( this ), parseInt($( this ).find( '.' + tablenavbar + ' li.active' ).attr('rel'))+1 );
        } )
    } )
    /*part of page reload after login*/
    setcache( 'url', window.location.href );
    /*Searching part*/
    $( 'body' ).on( 'change', '.' + searchinputclass, function (e)
    {
        
            var th = $(this);
            var table = $($(this).closest('form').attr('data-bindtable'));
            table.find('tfoot').remove();
            var rows = table.find('tbody tr');
            rows.removeClass('dontshow').removeAttr('style');

            if (!defined(table)) {
                consoleit('Not defined form attribute like data-bindtable="#your id" for search form means not defined your Bind Table id', "e");
            }
            rows.each(function () {

                tr = $(this);
                tr.show().addClass('showit');
                th.closest('form').find('.' + searchinputclass).each(function () {

                    if ($(this).val() != '' && $(this).val() != null) {

                        var value = tr.find('td[data-class=' + $(this).attr('data-searchclass') + ']').attr('data-val');
                        switch ($(this).attr('data-searchquery')) {
                            case 'equals':
                                {
                                    if (value != $(this).val()) {
                                        tr.hide().addClass('dontshow').removeClass('showit');
                                    }
                                    break;
                                }
                            case 'like':
                                {

                                    if (!value.toLowerCase().match($(this).val().toLowerCase())) {
                                        tr.hide().addClass('dontshow').removeClass('showit');
                                    }
                                    break;
                                }
                        }

                    }
                })

            });

            var cl = table.closest('div');
            cl.find( '.' + tablenavbar ).remove();
            cl.append( '<nav class="' + tablenavbar + '" data-perpage="' + table.attr( 'data-paginationperpage' ) + '"><ul class="pagination"></ul></nav>' );
            var rowsShown = parseInt(table.attr('data-paginationperpage'));
            var rowsTotal = table.find('tbody tr.showit').length;

            var numPages = (rowsTotal / rowsShown).toFixed(1);
            if (numPages > 1) {
                for (i = 0; i < numPages; i++) {
                    var pageNum = i + 1;
                    cl.find( '.' + tablenavbar + ' ul' ).append( '<li rel="' + i + '"><a>' + pageNum + '</a></li> ' );
                }
            }
            if (rowsTotal == 0) {
                table.append('<tfoot><tr><td class="text-center" colspan="' + table.find('thead td:visible').length + '">' + table.attr('data-noresultmessage') + '</td></tr></tfoot>');
            }
            cl.find( '.' + tablenavbar + ' ul' ).find( 'li:first' ).trigger( 'click' );
            var tagname = $(this)[0].tagName.toLowerCase();
            switch (tagname) {
                case 'select':
                    {

                        break;
                    }
                case 'input':
                    {
                        break;
                    }
                default:
                    {
                    }
            }


   
    } );
    
    if ( getcache( 'developmentmode' ) != "false" )
    {
        developmentmode( true );
    }
    
    $( 'body' ).on( 'change', 'input[type=file][data-imageid]', function ()
    {
        readURL(  this  );
    } );
    $( 'body' ).on( 'change', '.fieldjoin', function ()
    {
        var select = $( this );
        var td=$($( this ).attr( 'data-fieldjointable' )).find( 'tbody' ).find( $( this ).attr( 'data-fieldjoin') );
        td.each(function(n,col){
        var textbox = select.find( "option[value='" + $( this ).attr( 'data-val' ) + "']" );
        if ( textbox.length > 0 )
        {
            $( $(this).text(textbox.text()));
            select.removeClass( 'fieldjoin' );
        }
        })
    } )
    
} );

function IsJsonString( str )
{
    try
    {
        JSON.parse( str );
    } catch ( e )
    {
        return false;
    }
    return true;
}


