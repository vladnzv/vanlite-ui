window.addEventListener('load', () => {
    skeletonDemo();
	vl1 = new Vanlite();
			
	vl1.toast("Успешно", "success", 5000);
	vl1.toast("Ошибка", "error", 5000);
	vl1.toast("Предупреждение!", "warning", 5000);
	vl1.toast("Просто информация", "info", 5000);
	vl1.animateCircleProgress(".proto-ui-progress-circle", 10);
});

function skeletonDemo() {
	setTimeout(() => {
		
		const cards = document.querySelectorAll(".imgcard-demonstration .card");
		
		cards.forEach(card => {
			card.innerHTML = `
			<img src="img.jpg" style="width:100%; border-radius:8px; margin-bottom:12px">
			
			<h3>Заголовок карточки</h3>
			
			<p>
			Это текст карточки. Skeleton loader исчезает
			когда данные загрузились.
			</p>
			`;
		})
		
		
	}, 3000);
}

