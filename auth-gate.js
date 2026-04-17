/* Client-side password gate for GitHub Pages */
(function() {
  var PASS_HASH = '6a4e2d6f8c3b1a9e'; // simple hash of broader@2026
  var STORAGE_KEY = 'paganini_auth';
  
  function simpleHash(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      var chr = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return Math.abs(hash).toString(16).substring(0, 16);
  }
  
  // Already authenticated this session
  if (sessionStorage.getItem(STORAGE_KEY) === PASS_HASH) return;
  
  // Block rendering
  document.documentElement.style.display = 'none';
  
  window.addEventListener('DOMContentLoaded', function() {
    document.documentElement.style.display = '';
    document.body.innerHTML = '';
    document.body.style.cssText = 'margin:0;padding:0;background:#0a0a0a;display:flex;align-items:center;justify-content:center;height:100vh;font-family:monospace;';
    
    var container = document.createElement('div');
    container.style.cssText = 'text-align:center;padding:40px;border:1px solid #333;border-radius:8px;background:#111;max-width:400px;width:90%;';
    
    container.innerHTML = '<div style="font-size:48px;margin-bottom:16px">🔒</div>' +
      '<h2 style="color:#e5e5e5;margin:0 0 8px 0;font-size:18px">Acesso Restrito</h2>' +
      '<p style="color:#888;margin:0 0 24px 0;font-size:13px">Documentação interna — Paganini One</p>' +
      '<input id="pw" type="password" placeholder="Senha" style="width:100%;padding:10px 12px;background:#1a1a1a;border:1px solid #333;border-radius:4px;color:#e5e5e5;font-family:monospace;font-size:14px;box-sizing:border-box;outline:none;margin-bottom:12px;" />' +
      '<button id="btn" style="width:100%;padding:10px;background:#e5e5e5;color:#0a0a0a;border:none;border-radius:4px;font-family:monospace;font-size:14px;cursor:pointer;font-weight:bold;">Entrar</button>' +
      '<p id="err" style="color:#ef4444;margin:12px 0 0 0;font-size:12px;display:none">Senha incorreta</p>';
    
    document.body.appendChild(container);
    
    var input = document.getElementById('pw');
    var btn = document.getElementById('btn');
    var err = document.getElementById('err');
    
    function tryAuth() {
      var val = input.value;
      if (val === 'broader@2026') {
        sessionStorage.setItem(STORAGE_KEY, PASS_HASH);
        location.reload();
      } else {
        err.style.display = 'block';
        input.value = '';
        input.focus();
      }
    }
    
    btn.addEventListener('click', tryAuth);
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') tryAuth();
    });
    
    input.focus();
  });
})();
