var Browser = require('zombie'), assert = require('chai').assert;

var browser;

suite('Cross-Page Tests', function(){
    
    setup(function(){
        browser = new Browser();
    });
    
    test('requesting a group rate quote from the hood river tour page ' +
        'should populate the referrer field', function(done){
           var referrer = 'https://node-express-programmer655.c9users.io/tours/hood-river';
           browser.visit(referrer, function(){
               browser.clickLink('.requestGroupRate', function(){
                   try{
                       assert(browser.field('referrer').value === referrer);
                   }
                   catch(e){
                       done();
                   }
                   
               });
           });
    });
    
    test('requesting a group rate from the oregon coast tour page should ' +
        'populate the referrer field', function(done) {
        var referrer = 'https://node-express-programmer655.c9users.io/tours/oregon-coast';
        browser.visit(referrer, function(){
            browser.clickLink('.requestGroupRate', function(){
                try{
                    assert(browser.field('referrer').value === referrer);

                }
                catch(e){
                    done();
                }
            });
        });
    });
    
    test('visiting the "request group rate" page dirctly should result ' +
        'in an empty referrer field', function(done){
        browser.visit('https://node-express-programmer655.c9users.io/tours/request-group-rate',
            function(){
                assert(browser.field('referrer').value === '');
                done();
        });
});
});