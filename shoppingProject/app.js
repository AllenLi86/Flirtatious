// 以 Express 建立 Web 伺服器
var express = require("express");
var app = express();

// 以 body-parser 模組協助 Express 解析表單與JSON資料
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 允許跨域使用本服務
var cors = require("cors");
app.use(cors());

// Web 伺服器的靜態檔案置於 public 資料夾
app.use(express.static("public"));

// 以 express-session 管理狀態資訊
var session = require('express-session');
app.use(session({
	secret: 'secretKey',
	resave: false,
	saveUninitialized: true
}));

// 指定 esj 為 Express 的畫面處理引擎
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/view');

// // CORS 跨來源資源共享 (Cross-Origin Resource Sharing)
// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//     res.header("Access-Control-Allow-Headers", "*");
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });

// 一切就緒，開始接受用戶端連線
// app.listen(process.env.PORT);
app.listen(3000);
console.log("Web伺服器就緒，開始接受用戶端連線.");
console.log("鍵盤「Ctrl + C」可結束伺服器程式.");

// 建立資料庫連線
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: '127.0.0.1',
	user: 'root',
	password: 'root',
	database: 'shopping'
});

connection.connect(function (err) {
	// if (err) throw err;
	if (err) {
		console.log(JSON.stringify(err));
		return;
	}
});

// 依 HTTP 的 Method (POST/GET/PUT/DELETE) 進行增查修刪

// 所有產品資料
app.get("/products/lists", function (request, response) {

	connection.query('select * from products',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}

			response.send(JSON.stringify(rows));
		}
	);

})

// categories_dior.html的資料
app.get("/categories/dior", function (request, response) {

	connection.query('SELECT p.productId, p.brandId, p.categoryId, p.productName, p.productPrice, p.rating FROM products as p WHERE p.brandId = 1;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

app.get("/categories/dior/lipsticks", function (request, response) {
	connection.query('SELECT p.productId, p.brandId, p.categoryId, p.productName, p.productPrice, p.rating FROM products as p WHERE p.brandId = 1 && p.categoryId = 1;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

app.get("/categories/dior/bags", function (request, response) {
	connection.query('SELECT p.productId, p.brandId, p.categoryId, p.productName, p.productPrice, p.rating FROM products as p WHERE p.brandId = 1 && p.categoryId = 2;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

app.get("/categories/dior/perfumes", function (request, response) {
	connection.query('SELECT p.productId, p.brandId, p.categoryId, p.productName, p.productPrice, p.rating FROM products as p WHERE p.brandId = 1 && p.categoryId = 3;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

app.get("/categories/dior/price", function (request, response) {
	connection.query('SELECT p.productId, p.brandId, p.categoryId, p.productName, p.productPrice, p.rating FROM products as p WHERE p.brandId = 1 ORDER BY p.productPrice DESC;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

app.get("/categories/dior/stars", function (request, response) {
	connection.query('SELECT p.productId, p.brandId, p.categoryId, p.productName, p.productPrice, p.rating FROM products as p WHERE p.brandId = 1 ORDER BY p.rating DESC;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

//----------------------------------------------------------------------------------
// categories_YSL.html的資料
app.get("/categories/YSL", function (request, response) {

	connection.query('SELECT p.productId, p.brandId, p.categoryId, p.productName, p.productPrice, p.rating FROM products as p WHERE p.brandId = 12;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

app.get("/categories/YSL/lipsticks", function (request, response) {
	connection.query('SELECT p.productId, p.brandId, p.categoryId, p.productName, p.productPrice, p.rating FROM products as p WHERE p.brandId = 12 && p.categoryId = 1;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

app.get("/categories/YSL/bags", function (request, response) {
	connection.query('SELECT p.productId, p.brandId, p.categoryId, p.productName, p.productPrice, p.rating FROM products as p WHERE p.brandId = 12 && p.categoryId = 2;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

app.get("/categories/YSL/perfumes", function (request, response) {
	connection.query('SELECT p.productId, p.brandId, p.categoryId, p.productName, p.productPrice, p.rating FROM products as p WHERE p.brandId = 12 && p.categoryId = 3;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

app.get("/categories/YSL/price", function (request, response) {
	connection.query('SELECT p.productId, p.brandId, p.categoryId, p.productName, p.productPrice, p.rating FROM products as p WHERE p.brandId = 12 ORDER BY p.productPrice DESC;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

app.get("/categories/YSL/stars", function (request, response) {
	connection.query('SELECT p.productId, p.brandId, p.categoryId, p.productName, p.productPrice, p.rating FROM products as p WHERE p.brandId = 12 ORDER BY p.rating DESC;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})


// categories_Gucci.html的資料
app.get("/categories/Gucci", function (request, response) {

	connection.query('SELECT p.productId, p.brandId, p.categoryId, p.productName, p.productPrice, p.rating FROM products as p WHERE p.brandId = 14;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

app.get("/categories/Gucci/lipsticks", function (request, response) {
	connection.query('SELECT p.productId, p.brandId, p.categoryId, p.productName, p.productPrice, p.rating FROM products as p WHERE p.brandId = 14 && p.categoryId = 1;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

app.get("/categories/Gucci/bags", function (request, response) {
	connection.query('SELECT p.productId, p.brandId, p.categoryId, p.productName, p.productPrice, p.rating FROM products as p WHERE p.brandId = 14 && p.categoryId = 2;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

app.get("/categories/Gucci/perfumes", function (request, response) {
	connection.query('SELECT p.productId, p.brandId, p.categoryId, p.productName, p.productPrice, p.rating FROM products as p WHERE p.brandId = 14 && p.categoryId = 3;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

app.get("/categories/Gucci/price", function (request, response) {
	connection.query('SELECT p.productId, p.brandId, p.categoryId, p.productName, p.productPrice, p.rating FROM products as p WHERE p.brandId = 14 ORDER BY p.productPrice DESC;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

app.get("/categories/Gucci/stars", function (request, response) {
	connection.query('SELECT p.productId, p.brandId, p.categoryId, p.productName, p.productPrice, p.rating FROM products as p WHERE p.brandId = 14 ORDER BY p.rating DESC;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})


//----------------------------------------------------------------------------------

// categories_com.html的資料
app.get("/categories/lipsticks/compare", function (request, response) {
	connection.query('SELECT l.productId, b.bName, p.rating, p.productName, p.productPrice, l.f1, l.f2, l.f3, l.f4, l.f5, l.f6, l.f7, l.f8 FROM lipstickinfo l INNER JOIN (products p LEFT JOIN brand b ON p.brandId = b.brandId) ON l.productId = p.productId;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

app.get("/categories/perfumes/compare", function (request, response) {
	connection.query('SELECT pi.productId, b.bName, p.rating, p.productName, p.productPrice, pi.capacity, pi.origin, pi.pF1, pi.pF2, pi.pF3 FROM perfumeinfo pi INNER JOIN (products p LEFT JOIN brand b ON p.brandId = b.brandId) ON pi.productId = p.productId;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

// 依照價格搜尋商品(50000~100000)
app.get("/sorted/price/bags/dior", function (request, response) {
	connection.query('SELECT * FROM products p WHERE (p.productPrice >= 50000 && p.productPrice <= 100000) && p.categoryId = 2 && p.brandId = 1 ORDER BY p.productPrice;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

app.get("/sorted/price/bags/YSL", function (request, response) {
	connection.query('SELECT * FROM products p WHERE (p.productPrice >= 50000 && p.productPrice <= 100000) && p.categoryId = 2 && p.brandId = 12 ORDER BY p.productPrice;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

app.get("/sorted/price/bags/Gucci", function (request, response) {
	connection.query('SELECT * FROM products p WHERE (p.productPrice >= 50000 && p.productPrice <= 100000) && p.categoryId = 2 && p.brandId = 14 ORDER BY p.productPrice;',
		'',
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);
})

// 依照價格搜尋商品(活)
app.get("/dior/priceSort/:minPrice/:maxPrice/:c", function (request, response) {

	connection.query('SELECT * FROM products p WHERE (p.productPrice >= ? && p.productPrice <= ?) && p.categoryId = ? && p.brandId = 1 ORDER BY p.productPrice;',
		[
			request.params.minPrice,
			request.params.maxPrice,
			request.params.c
		],
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);

})

app.get("/YSL/priceSort/:minPrice/:maxPrice/:c", function (request, response) {

	connection.query('SELECT * FROM products p WHERE (p.productPrice >= ? && p.productPrice <= ?) && p.categoryId = ? && p.brandId = 12 ORDER BY p.productPrice;',
		[
			request.params.minPrice,
			request.params.maxPrice,
			request.params.c
		],
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);

})

app.get("/Gucci/priceSort/:minPrice/:maxPrice/:c", function (request, response) {

	connection.query('SELECT * FROM products p WHERE (p.productPrice >= ? && p.productPrice <= ?) && p.categoryId = ? && p.brandId = 14 ORDER BY p.productPrice;',
		[
			request.params.minPrice,
			request.params.maxPrice,
			request.params.c
		],
		function (err, rows) {
			if (err) {
				console.log(JSON.stringify(err));
				return;
			}
			response.send(JSON.stringify(rows));
		}
	);

})