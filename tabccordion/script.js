$(function() {
  var mq = window.matchMedia("(min-width: 500px)");
  if(mq.matches) {
    var oAtivo = null;
    
    // adiciona ARIA role
    $("ul.tab").attr("role", "tablist");
  
    var oTabs = $(".tab a").on("click", function() {
      oAtivo = $(this.hash).removeAttr("id");
      if(this.hash == location.hash) setTimeout(atualiza, 0);
    }).attr({ tabindex:"0", role:"tab" }).on("keydown", function(e) {
      switch(e.which) {
        case 13:
          $(this.hash+" a").focus();
          break;
        case 35:
          e.preventDefault();
          oTabs.last().focus();
          break;
        case 36:
          e.preventDefault();
          oTabs.first().focus();
          break;
        case 37:
          $(this).prev(".tab a").focus();
          break;
        case 39:
          $(this).next(".tab a").focus();
          break;
      }
    });
  
    var aId = oTabs.map(function() {
      return this.hash;
    }).get();
  
    var oPaineis = $(aId.join(",")).each(function() {
      $(this).data("antigo-id", this.id);
    }).attr("role", "tabpanel");
    
    // inicializa
    $(window).on("hashchange", atualiza);
    atualiza();
  }
  else {
    // transforma tabs em accordion
    var aTit = $(".tab li").map(function() {
      return this.innerHTML;
    }).get();
    
    $(".conteudo-tabs div").each(function(i) {
      $(this).before("<h4>"+(i+1)+". "+aTit[i]+"</h4>").addClass("accordion-conteudo");
    }).first().addClass("ativo").parent().addClass("accordion").removeClass("conteudo-tabs");
  
    $(".tab").hide();
  }

  function mostraTabs(id) {
    if(!id) id = aId[0];
    oTabs.removeClass("selecionado").attr("aria-selected", "false").filter(function() {
      return this.hash == id;
    }).addClass("selecionado").attr("aria-selected", "true");
    oPaineis.hide().attr("aria-hidden", "true").filter(id).show().attr("aria-hidden", "false");
  }
  
  function atualiza() {
    if(oAtivo) {
      oAtivo.attr("id", oAtivo.data("antigo-id"));
      oAtivo = null;
    }
    var hash = window.location.hash;
    mostraTabs(hash);
  }
  
  $(".accordion h4").click(function() {
    $(this).parent().find(".ativo").slideUp("fast").removeClass("ativo");
    $(this).next().slideToggle("fast").addClass("ativo");
  });
  
  // inicializa
  $(".accordion-conteudo").hide().filter(".ativo").show();
});