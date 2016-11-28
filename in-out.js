$(function() {
  $('input[type=button]').click(function (){
        var str = $("#input").val().split('\n');
        var output="";
        var index = 0;
        var aLine = str[index];
        var fileName;
        output += '[';
        while (aLine !== 'undefined' && aLine != null)
        {
          var aaa = /Line.*?:/g;
          var bbb = /id.*?}|root.*?}/g;
          var ccc = /[0-9][0-9]:[0-9][0-9]:[0-9][0-9]/g;
          var ddd  = /[(]hctra.*?:|[(]sitecore.*?:/g;
          var eee = /\/HCTRA\/.*?\//g;
          var fff = /\/sitecore\/.*?,/g;
          var ggg = /Login|Logout|Upload|Save item|Drag item|Rename item|Start editing|Attach|Set publishing targets|Set display name|Detach file|Publishing|Publish/g;
          var hhh = /[a-zA-Z0-9-_.]+\.txt*/g;
          var pattern = /targets:PROD Site/g;
          var a, b, c, d, e, f, g, h;
          var a1, b1, d1;
          output += "{";
            //File
            if ((h = hhh.exec(aLine)) !== null)
            {
                h.forEach((hh, groupIndex) => {
                    fileName = hh;
                    output = output+`\n"File":"${fileName}",\n`;
                });
            }
            else {
                    output = output+`\n"File":"${fileName}",\n`;
            }
            //Line
            if ((a = aaa.exec(aLine)) !== null)
            {
                a.forEach((aa, groupIndex) => {
                    a1 = aa.split("Line ")[1].split(":")[0];
                    output = output+'"Line":"'+a1+'",\n';
                });
            }
            else {
              output += '"Line":"",\n';
            }
            //Time
            if ((c = ccc.exec(aLine)) !== null)
            {
                c.forEach((cc, groupIndex) => {
                    output = output+`"Time":"${cc}",\n`;
                });
            }
            else {
              output += '"Time":"",\n';
            }
            //Author
            if ((d = ddd.exec(aLine)) !== null)
            {
                d.forEach((dd, groupIndex) => {
                    var usernames = /sitecore\\|hctra\\/g;
                    d1 = dd.split(usernames)[1].split(")")[0];
                    output = output+'"Author":"'+d1+'",\n';
                });
            }
            else {
              output += '"Author":"",\n';
            }
            //Action
            if ((g = ggg.exec(aLine)) !== null)
            {
                g.forEach((gg, groupIndex) => {
                    output = output+`"Action":"${gg}",\n`;
                });
            }
            else {
              output += '"Action":"",\n';
            }
            //Module
            if ((e = eee.exec(aLine)) !== null)
            {
                e.forEach((ee, groupIndex) => {
                    output = output+`"Module":"${ee}",\n`;
                });
            }
            else {
              output += '"Module":"",\n';
            }
            //ItemID
            if ((b = bbb.exec(aLine)) !== null)
            {
                b.forEach((bb, groupIndex) => {
                    var contentItem = /id:|root:/g;
                    b1 = bb.split(contentItem)[1];
                    output = output+'"ItemID":"'+b1+'",\n';
                });
            }
            else {
              output += '"ItemID":"",\n';
            }
            //
            if ((f = fff.exec(aLine)) !== null)
            {
                f.forEach((ff, groupIndex) => {
                    output = output+`"ItemPath": "${ff}",\n`;
                });
            }
            else {
              output += '"ItemPath":"",\n';
            }
            //
            output += (pattern.test(aLine)) ?  '"Published":"Yes"\n},' : '"Published":"No"\n},';
            index += 1;
            aLine = str[index];
        }
        output = output.substring(0, output.length-1);
        output += ']';
        $("#output").val(output);
    });
});
